from flask import Flask, jsonify, request # To run the server
from urllib.parse import urlparse, parse_qs # To get the youtube video id
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound # For getting ready captions
from pytube import YouTube # For getting audio from a youtube video
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/api/analyze', methods=['POST'])
def analyze_videos():
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
    videos_ids = []
    for url in videos_urls:
        parsed_url = urlparse(url)
        query_params = parse_qs(parsed_url.query)
        videos_ids.append(query_params.get("v")[0])
    
    for id in videos_ids:
        try:
            transcript_list = YouTubeTranscriptApi.get_transcript(id)
            print(transcript_list)
        except NoTranscriptFound:
            url = f"https://www.youtube.com/watch?v={id}"
            yt = YouTube(url)
            audio_stream = yt.streams.filter(only_audio=True).order_by('abr').desc().first()
            print("Cant find transcript for: ", id)
    return jsonify({"received": videos_urls})

if __name__ == "__main__":
    app.run(debug=True)
