const takeVideo = async () => {
  try {
    const res = await fetch('/getvideo');
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
takeVideo();
