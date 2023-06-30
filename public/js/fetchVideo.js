const videoArea = document.querySelector('.video-area');

const takeVideo = async () => {
  try {
    const res = await fetch('/getvideo');
    const data = await res.json();
    console.log(data);
    let userVideo = '';
    data.videoPosted.forEach((video) => {
      userVideo += `
                    <div class="video-container">
                      <div class="fileVideo style="background-image: url('${video.thumbnail}')"></div>
                      <div class="video-info">
                        <h3>${video.title}</h3>
                        <p>${video.description}</p>
                        <p>${video.uploadAt}</p>
                      </div>
                    </div>
                  `;
    });
    videoArea.innerHTML = userVideo;
  } catch (error) {
    console.log(error);
  }
};
takeVideo();
