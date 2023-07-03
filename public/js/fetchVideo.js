const videoArea = document.querySelector('.video-area');

const takeVideo = async () => {
  try {
    const res = await fetch('/getvideo');
    const data = await res.json();
    console.log(data);
    data.videoPosted.forEach((video) => {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('video-container');
      videoContainer.innerHTML = `
        <div class="fileVideo"></div>
        <div class="video-info">
          <h3>${video.title}</h3>
          <p>${video.description}</p>
          <p>${video.uploadAt}</p>
        </div>
      `;
      videoArea.appendChild(videoContainer);
      videoContainer.addEventListener('click', () => {
        console.log(video._id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
takeVideo();
