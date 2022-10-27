document
  .querySelector("button#removeBtn")
  .addEventListener("click", async (e) => {
    let conf = confirm("Do You Want to delete this lyric?");
    if (conf) {
      console.log(e.target.dataset.lyricid);
      try {
        let result = await axios.delete(
          "/lyric/remove/" + e.target.dataset.lyricid
        );
        if (result.data.ok) {
          alert(result.data.msg);
          window.location = "/";
        }
      } catch (error) {
        alert('something went wrong!')
      }
    }
  });
