const user = {
  username: 'suki',
  email: 'suki@gmail.com',
  password: 'sjhdasujdajdnasdjnaskjdnas',
  videos: [
    {
      title: 'down',
      uploadAt: 'yesterday',
    },
  ],
};

user.videos.forEach((e) => {
  e.push({ title: 'sit', uploadAt: 'no' });
});

const getVideosDetails = user.videos;
console.log(getVideosDetails);
