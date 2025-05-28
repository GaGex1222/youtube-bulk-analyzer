from flask import Flask, jsonify, request # To run the server
from urllib.parse import urlparse, parse_qs # To get the youtube video id
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound # For getting ready captions
from pytubefix import YouTube # For getting audio from a youtube video
import os
import openai
from dotenv import load_dotenv
from supabase import create_client
load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_API_KEY")
supabase = create_client(url, key) 
current_dir = os.path.dirname(os.path.abspath(__file__)) 
app = Flask(__name__)

@app.route('/')
def home():
    supabase.table('users').insert({
        "email": "Random",
        "username": "Text122",
        "password": "Gald122"
    }).execute()
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
    
    summaries = {} # Title: Captions
    for id in videos_ids:
        try:
            transcript_list = YouTubeTranscriptApi.get_transcript(id)
            print(transcript_list)
        except NoTranscriptFound:
            print("Cant find transcript for: ", id, " Now trying to get captions with whisper")
            break
            url = f"https://www.youtube.com/watch?v={id}"
            yt = YouTube(url)
            title = yt.title
            audio_stream = yt.streams.filter(only_audio=True).order_by('abr').desc().first()
            audio_stream.download(output_path=current_dir, filename='audio.mp3')
            #only resume this part when i want to release app, to reduce development expenses
            # with open("audio.mp3", "rb") as audio_file:
            #    transcript = openai.audio.transcriptions.create(
            #        model="whisper-1",
            #        file=audio_file
            #    )
            text = "בומה בתראשון צריך לשפשף את העניין. במקום שהתמרגילים לראות בואy את המסך של השלאם פטופ, קן יש משקפיים. ספייסטופ, פעול, לפטופ של מייניינשי, שוניכה עשלכה בתי גב. הסתר דאפי ישראלי הקטנה הזה שמונה בסך הכול שישים מובדים, בבקש לשנות באמצעות מציאות רבודה את הדרך שבא כל מישיושב מול מחשב עובד. מול איתו. רק אם שינוי קטן במקום עשך יש לנו משקפיים. שרסות? שרסות מבדה. את השב צורה נוכן, כמו שאתה עושב מול מחשב רגיד. ארהו. אני מסתכל לך אני רואה אותך, אני לא רואה כרגע את המסך שלה המחשב. אני מסתכל פעמול היחידה שלי ופי תומש לי פה את תצוגה פנורמית רחבה. אני מגניב. אני רואה פעמולי בעצם דסטופ פרגיל. אני רואה את החיפוש שלי בגוגל, יוטיוב, ג'ימאל, היו מען שלי, כשאני מול המחשב, אני רואה את המסך שלי, אבל אם אני מסתכל, הצלע נראות חייקיון מסתכל, למשקפיים, צלעייקים, משקפשם, שאני רואה להימת, אבל אני רואה אותך, אני יכול לקהמית לך סיכה. בזמן שאנחנו התנסינו במוצר, סמנו לב שם, מססקים שסוווינו ברחבי המסרד, כבועים פשוט קיקן כבר לא ממש צריך אותם. עכשיו יש לך פתאום תכנת עבודה, שמכליפה שלושה 4-5 משחים, נהידת, ביקרון פקטית מאוד. לא תקח את המחשיר את הקום, ופשוט תלך מסביב. אוקיי, עכשיו אני לא רואה כלום. נכון, כרגע אנחנו ממצב ניהיה, חמסך נשאר פה מה לשולחנים. אז הוא בעצם מישה רפושה איתי, אין, אני רואה אותו פתאום. נכון, מכאן. זה עשוד של הקסם של מפסטריאליתי, זה בעצם הפיקסלים באמת נמצאים פה בתוך החלל, בתוך חדר במקום יחסי. אוקיי, ואין מה נראות זה, אבל היא סטול עכשיו ולראות את המסחים מולי. זה נכו בעצם, משנה עם עוד, עם אז קיצור, שגם נמצא בתפרית, ועכשיו אני רואה את זה מולי. נכון, בכל מקום שתלך עם המקלדת, שם המסח יגיע איתך. התצורות המוקרות קיום של משקפיים, שבהם מותמא הטכנולוגיה שכזו מתחלקות לשני. זה תמקוותים ומסור בלים של משקפיים הציוט רבודה, כמו המתקויסט או האפלויזיון פרו. היי מתה, תקוווידיום. ומשקפיים רגילים למרא שאי יכולות הטכנולוגיות שלהם לא מתפתות ביטצוגה בתוך האדשה, ומסתקות במצלמה מובנה את ועוד כמה אלמנטים. אנחנו מצלמים את כל מה שקורס ובבנו, את המצלמה הזאת, את המצלמה הזאת, את כל מה שנמצקן. כאן, בזכות כבר שמתחבר ליחידת הבסיס, היא המחשב הנעד, המשקפיים שומרים על המבנה הטבעי שלהם והדעין, הטצוגה שמגיע על העיניים, הרבה יותר מפותחת. גם מתה וגם מהפלויזי חברות אחרות, וגם אנחנו רואים את המקודת התקרנסות האטידית, לנקודת דומה. כולנו רוצים בסוף לבש, משקפיים קלות, משקל, כמו ראי בן, על חותיות, את הצוגות. הם עוד לא יאילות אנרגטית לרמה, שנוכל להעורו זה את הכל, מה שהוא קריר, מה שהוא קטן, ומה שהוא שייכזו אתנו, כ-520 שאת העבודה לכל היום. המוצר הזה, שהם מגזין טיים בחרבו לאחת האמצעות, המבטיחות של לפיים 23, יוצא את הלעפצה מסכרית, אלף צ'ה מודולר ליחידה הזאת הגמיכיר, אבל אם צפיתם עכשיו, והתחשק לכם לרוץ ולקנות, צפוי על הכל מחזבה. אנחנו מתכנים משהו כמה מריקאי, כי זה שוק מאוד ודול ומאוחד, אנחנו כבר מקבלים מפניות רבות מהרופה, והם אמי שישראל תגיע בשנים הקובות, מאוד קובות. לחברה הקטנה הזאת, מישראל ישודר חרוקה לעבור, לפני שתוכל להגיע למגרש של הגדולות באמת. אנחנו מאמינים שעדווה הזה, וולוצה טבעית של עבודה עם עכשיו. אז יחליף לנו תלאב, תופי, נחליף את המחשבים שלנו, ומשם הזה לחוי גדל. אנחנו לא באים להמצאים חדש, איך אנשים מובדים נחשב, ואנחנו עושים שינוי קטן, וזה מוריד מורדים מגבלות של מקום. המפתחים כאן אופטימים, מתכנתן, משקפי המחשב על הלום, ולגמרי, הדבר הגדולה בה"
            #Getting a summary from gpt
            summary = openai.chat.completions.create(
                model="gpt-4",  # or "gpt-3.5-turbo" in case of other subscription
                messages=[
                    {"role": "system", "content": (
                        "You are a summarization assistant. Your only job is to summarize the actual spoken content from YouTube captions, "
                        "as accurately and concisely as possible. Do not describe the topic generally. Focus on what the speaker explicitly says."
                    )},
                    {"role": "user", "content": text}
                ]
            )
            print(summary.choices[0].message.content)
    return jsonify({"received": videos_urls})

if __name__ == "__main__":
    app.run(debug=True)


