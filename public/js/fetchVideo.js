const videoArea = document.querySelector('.video-area');

const takeVideo = async () => {
  try {
    const res = await fetch('/getvideo');
    const data = await res.json();
    console.log(data);

    if (data.videoPosted.length == 0) {
      const noVideoMessage = document.createElement('h1');
      noVideoMessage.classList.add('novideo-info');
      noVideoMessage.textContent = 'No Video Uploaded';
      videoArea.appendChild(noVideoMessage);
    } else {
      data.videoPosted.forEach((video) => {
        console.log(video.thumbnail);
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');
        videoContainer.innerHTML = `
          <div class="fileVideo" style="background-image: url('/assets/images/${video.thumbnail}')"></div>
          <div class="video-info">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <p>${video.uploadAt}</p>
          </div>
        `;
        videoArea.appendChild(videoContainer);
        videoContainer.addEventListener('click', () => {
          location.assign(`/index/${video._id}`);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
takeVideo();
