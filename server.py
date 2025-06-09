from flask import Flask, jsonify, request # To run the server
from urllib.parse import urlparse, parse_qs # To get the youtube video id
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound # For getting ready captions
from pytubefix import YouTube # For getting audio from a youtube video
from pytubefix.exceptions import VideoUnavailable, RegexMatchError # For handling invalid youtube links
import os # to access env keys
import openai # to interact with openai api
from dotenv import load_dotenv # to access env keys
from supabase import create_client # to access db
from flask_cors import CORS # to enable cors in my server
import bcrypt # for password encryption
import jwt #for handling jwt
import math #for messing around with video length
from datetime import datetime, timedelta #for jwt timestamp
import uuid # For random generated string

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_API_KEY")
secret_key = os.environ.get("SECRET_KEY")
supabase = create_client(url, key) 
current_dir = os.path.dirname(os.path.abspath(__file__)) 
app = Flask(__name__)
CORS(app, origins=["http://localhost:3001", "http://localhost:3000"])

def get_and_validate_token():
    """
    A function to get and validate client sent token
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Authorization header missing or invalid'}), 401
    token = auth_header.split(' ')[1]
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=["HS256"])
        return decoded_token
    except jwt.ExpiredSignatureError:
        raise jwt.ExpiredSignatureError('Token has expired.')
    except jwt.InvalidTokenError:
        raise jwt.InvalidTokenError('Invalid token.')


#Token creation for jwt
def create_access_token(data: dict):
    """
    A function that creates JWT with a custom payload
    """
    payload = data.copy()
    expire = datetime.now() + timedelta(hours=1)
    payload.update({"exp": expire})
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token

def summarize_transcript(text: str, credit_type: str):
    """
    Takes a text and summarize it using open AI
    Returns the summary
    """
    response = openai.chat.completions.create(
        model="gpt-4o" if credit_type == "special" else "gpt-3.5-turbo",  # or "gpt-3.5-turbo" in case of other subscription
        messages=[
            {"role": "system", "content": (
                "You are a summarization assistant. You are given youtube captions, your only job is to summarize the actual spoken content from YouTube captions, "
                "as accurately and concisely as possible. Do not describe the topic generally. Focus on what the speaker explicitly says."
            )},
            {"role": "user", "content": text}
        ]
    )
    summary = response.choices[0].message.content
    return summary

def transcribe_youtube_video(video_id: str):
    try:
        response = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([t['text'] for t in response])
        return transcript
    except Exception as e:
        print("Erorr occured when trying to get transcript of youtube video with api: ", e, "Now using whisper")
        url = f"https://www.youtube.com/watch?v={id}"
        yt = YouTube(url)
        title = yt.title
        filename = f"{uuid.uuid4().hex}.mp3"
        audio_stream = yt.streams.filter(only_audio=True).order_by('abr').desc().first()
        audio_stream.download(output_path=current_dir, filename=filename)
        
        with open(filename, "rb") as audio_file:
            transcript = openai.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )

@app.route('/')
def home():
    supabase.table('users').insert({
        "email": "Random",
        "username": "Text122",
        "password": "Gald122"
    }).execute()
    return "Hello, Flask!"

@app.route('/signup', methods=["POST"])
def signup():
    credentials = request.get_json()
    email = credentials.get("email")
    password = credentials.get("password").encode('utf-8')

    email_exists = supabase.table("users").select("email").eq('email', email).limit(1).execute()
    if(email_exists.data):
        return jsonify({"error": "Email already exists, try logging in."}), 500
    
    hashed_pass = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')
    try:
        supabase.table('users').insert({
            "email": email,
            "password": hashed_pass
        }).execute()
        token = create_access_token({"email": email})
        return jsonify({"token": token}), 200
    except Exception as e:
        print("Error while trying to insert user data to db: ", e)
        return jsonify({"error": 'Error signing up, try again later.'}), 500
    

@app.route('/login', methods=["POST"])
def login():
    credentials = request.get_json()
    email = credentials.get("email")
    password = credentials.get("password").encode('utf-8')
    
    user = supabase.table("users").select("*").eq('email', email).limit(1).execute()
    if not user.data:
        return jsonify({"error": "Can't find account with that email, try another one."}), 500
    
    is_correct_password = bcrypt.checkpw(password, user.data[0]['password'].encode('utf-8'))
    if(is_correct_password):
        token = create_access_token({"email": user.data[0]['email']})
        return jsonify({"token": token}), 200
    else:
        return jsonify({"error": "Incorrect password."}), 401

@app.route("/api/get-credits", methods=['GET'])
def get_credits():
    try:
        decoded_token = get_and_validate_token()
    except Exception as e:
        print("Error happened while trying to decode token: ", e)
        return jsonify({"message": str(e)}), 401
    user_email = decoded_token.get("email")
    user_data = supabase.table("users").select("regular_credits,special_credits").eq("email", user_email).execute().data[0]
    regular_credits = user_data['regular_credits']
    special_credits = user_data['special_credits']
    print(regular_credits)
    print(special_credits)
    return jsonify({"special_credits": special_credits, "regular_credits": regular_credits})

@app.route("/api/summary-request", methods=['POST'])
def summary_request():
    """
    Handling a request for analyzing/summarizing video/s
    Expects JSON body:
    {
        "videos": [ "video_url_1", "video_url_2", ... ]
    }

    """
    data = request.get_json()
    videos = data.get("videos")
        
    videos_stats = []
    for index, url in enumerate(videos):
        try:
            yt = YouTube(url)
            video_length = math.ceil(yt.length / 60)
            video_title = yt.title
            video_author = yt.author
            videos_stats.append({"title": video_title, "credits": video_length, "author": video_author})
        except (RegexMatchError, VideoUnavailable):
            return jsonify({"error": f"Youtube link {index + 1} is invalid or unavailable."})

    return jsonify({"results": videos_stats})

@app.route('/api/summarize', methods=['POST'])
def summarize_videos():
    """
    Handle analyzing videos in bulk and returning a summary of each one.

    Expects JSON body:
    {
        "videos": [ "video_url_1", "video_url_2", ... ]
    }

    Returns:
        dict: A dictionary with video titles as keys and summaries as values.
        
        Optional: Also generates a text file with each video's summary.
    """


    # Getting videos ids
    videos_urls = request.json['videos']
    credit_type = request.json['creditType']
    videos_ids = []
    for url in videos_urls:
        parsed_url = urlparse(url)
        query_params = parse_qs(parsed_url.query)
        videos_ids.append(query_params.get("v")[0])
    
    summaries = {} # Title: Captions
    for id in videos_ids:
        print("Video id: ", type(id))
        transcribe_youtube_video("EZDV_zif228")

    return jsonify({"received": videos_urls, "credits": credit_type})

if __name__ == "__main__":
    app.run(debug=True)


