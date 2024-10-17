var audio = document.getElementById("myAudio");
var circleDiv = document.querySelector(".circle");

// เพิ่มเหตุการณ์เมื่อคลิกที่ <div> ที่มี class "circle"
circleDiv.addEventListener("click", function () {
  if (audio.paused) {
    audio.play(); // เริ่มเล่นเพลงหากยังไม่ได้เล่น
  } else {
    audio.pause(); // หยุดเล่นเพลงหากกำลังเล่น
  }
  // คำสั่งด้านล่างใช้สลับคลาส "playing" เพื่อแสดงสถานะการเล่น
  circleDiv.classList.toggle("playing");
});

// เพิ่มเหตุการณ์เมื่อเสียงเล่นเสร็จ
audio.addEventListener("ended", function () {
  circleDiv.classList.remove("playing"); // ลบคลาส "playing" เมื่อเสียงเล่นเสร็จ
});
