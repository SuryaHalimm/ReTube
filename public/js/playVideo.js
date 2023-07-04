const videoId = window.location.pathname.split('/').pop();
videoDetailPlay(videoId);

const videoPlaying = document.querySelector('.container-video-area');

async function videoDetailPlay(videoId) {
  try {
    const res = await fetch(`/getVideo/${videoId}`);
    const data = await res.json();
    const dataDetail = data.videoDetail;
    const videoPlayContainer = document.createElement('div');
    videoPlayContainer.classList.add('video-play-container');
    videoPlayContainer.innerHTML = `
        <div class="fileVideo-play">
          <video width="100%" height="100%" controls>
            <source src="/assets/videos/${dataDetail.fileVideo}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="video-info-play">
          <h1>${dataDetail.title}</h1>
          <br/>
          <p>
            ${dataDetail.uploadAt}
            <br/>
            ${dataDetail.description}
          </p>
        </div>
      `;
    videoPlaying.appendChild(videoPlayContainer);
  } catch (err) {
    console.log('No video info');
  }
}
