videoId = window.location.pathname.split('/').pop();
videoDetailPlay(videoId);

async function videoDetailPlay(videoId) {
  try {
    const res = await fetch(`/getVideo/${videoId}`);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log('No video info');
  }
}
