function setting() {
  fetch(
    "https://animal-fujitsu-magnet-visibility.trycloudflare.com/api/setting/general"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data.data);
    })
    .catch((error) => {
      console.error("Error fetching settings:", error);
    });
}

setting();
