
var arr = Array(0);
const width = window.innerWidth;
const height = window.innerHeight - 200;
var thick = 20;
var len_arr = Math.floor(width / thick);
var sorted_arr = Array(0);
var start_sorting = false;
var frame_rate_val = 40;
var pause = false;

const algo_dict = {
    bubbleSort: bubbleSort,
    selectionSort: selectionSort,
};

class Element {
    constructor(val) {
        this.val = val;
        this.compare = false;
        this.swap = false;
        this.sub_arr = false;
    }

    draw(i, color = 255) {
        fill(color);
        if (this.compare == true) {
            fill(0, 255, 255);
        }
        if (this.swap == true) {
            fill(255, 0, 0);
        }
        stroke(0);
        this.swap = false;
        this.compare = false; 
        this.pivot = false; 
        rect(i * thick, height - this.val + 1, thick, this.val);
        if (thick > 5) {
            noStroke(); 
            ellipse(
                i * thick + thick / 2 + 0.5,
                height - this.val + 1,
                thick - 1
            );
           
        }
    }
}

function setup() {
    
    createCanvas(width, height);
    var btns = document.querySelectorAll(".clickable");
 
    for (btn of btns) {
        btn.addEventListener("click", function () {
           
            if (this.id == "reset") {
              
                arr = [];
                sorted_arr = [];
                start_sorting = false;
                frameRate(frame_rate_val);
                setup_arr();
                document.getElementById("frm").value = "40";
            } else {
                if (this.id != "") {
                    if (start_sorting == false) {
                        start_sorting = true;
                        start_sort(this.id);
                        frameRate(frame_rate_val);
                    } else {
                        arr = [];
                        sorted_arr = [];
                        start_sorting = false;
                        frameRate(frame_rate_val);
                        setup_arr();
                        start_sorting = true;
                        start_sort(this.id);
                    }
                }
            }

            return true;
        });
    }
    slider_control(); 
    setup_arr(); 
  
}

function slider_control() {
    var size_slider = document.getElementById("data_size");
    size_slider.oninput = function () {
        thick = 62 - size_slider.value;
        len_arr = Math.floor(width / thick);
        arr = [];
        sorted_arr = [];
        start_sorting = false;
        frameRate(frame_rate_val);
        setup_arr();
      
    };
    var frm_slider = document.getElementById("frm");

    frm_slider.oninput = function () {
     
        if (this.value == 0) {
            frame_rate_val = 0;
            frameRate(0);
        }
        if (1 < this.value && this.value <= 10) {
            if (frameRate() != 5) {
                frame_rate_val = 5;
                frameRate(5);
            }
        }
        if (11 < this.value && this.value <= 20) {
            if (frameRate() != 20) {
                frame_rate_val = 20;
                frameRate(20);
            }
        }
        if (21 < this.value && this.value <= 30) {
            if (frameRate() != 40) {
                frame_rate_val = 40;
                frameRate(40);
            }
        }
        if (35 < this.value && this.value <= 40) {
            if (frameRate() != 60) {
                frame_rate_val = 60;
                frameRate(60);
            }
        }
    };
}
function setup_arr() {
    for (let i = 0; i < len_arr; i++) {
        push_value = random(thick, height - thick);
        arr.push(new Element(push_value));
        sorted_arr.push(push_value);
    }
    sort_the_arr(sorted_arr);
}
function start_sort(algo) {
    loop_counter = algo_dict[algo](arr);
}
function draw() {
    background(0);

    if (start_sorting == true) {
        loop_counter.next();
    }
    draw_arr();
}

function draw_arr() {
    for (let i = 0; i < arr.length; i++) {
        arr[i].draw(i);
        if (sorted_arr[i] == arr[i].val) {
            arr[i].draw(i, color(0, 255, 0));
        }
    }
}
function sort_the_arr(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}


