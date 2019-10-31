import "../sass/main.scss";
import {
  tasks
} from "./test_tasks.js";
import {
  images
}
from "./images.js";


//import "./images/logo-hn.png";

function LoadTask(task, deferred) {
  // When the task is loaded, do...
  var path = "./heigit_1/"

  if (!$.isEmptyObject(task)) {

    //alert(task[4].xMin);
    var MyImage = new Image(256, 256);

    MyImage.src = "img/heigit_1/64962_120509_18.jpg";
    MyImage.className = "img-thumbnail";
    var i = 0;



    $("#next").click(function () {

      i++;
      MyImage.src = "img/heigit_1/" + images[i];



    });
    document.getElementById("taskviewer").appendChild(MyImage);


  } else {
    deferred.resolve(task);
  }


};

function PresentTask(task, deferred) {
  if (!$.isEmptyObject(task)) {
    //loadUserProgress();

  } else {
    deferred.resolve(task);
  }
};
$(document).ready(function () {

  LoadTask(tasks);
  console.log(Object.keys(images).length);

});