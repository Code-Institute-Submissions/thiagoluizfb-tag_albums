var uploadFiles = []
var images = [];
var outputs = [];
var allTags = "@";
var output = 0;
var uploaded = [];

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

$('.carousel').carousel()

function loadFile(event) {
    $(".upload-photo-btn").html("Add more");
    $(".image-container").css("display", "none");
    $(".tag-all-slot").css("display", "block");
    var numFiles = $("#upload-photo")[0].files.length;
    for (i = 0; i < numFiles; i++) {
        imageName = event.target.files[i].name;
        if (images.indexOf(imageName)<0){
            uploadFiles.push(event.target.files[i]);
            images.push(imageName);
            outputs.push(output);
            idName = `output${output}`;
            $("#frame").append(`
            <div id="${idName}-container" class="col-12 col-md-6 col-lg-3 text-center">
                <div class="position-relative frame-wrapper">
                    <img id="${idName}" class="thumbnail" onmouseenter="showDelete(this)" onmouseleave="hideDelete(this)"/>
                    <span class="btn delete-thumbnail">
                        <strong>
                            <i id="${idName}-delete-img" class="far fa-times-circle" onclick="deleteImg(this)" data-toggle="tooltip" data-placement="top" title="Remove this file"></i>
                        </strong>
                    </span>
                </div
            </div>`);
            var image = document.getElementById(idName);
            image.src = URL.createObjectURL(event.target.files[i]);
            output++;
        };
    };
    update();
}


update = function(){
    uploaded[0] = uploadFiles;
    uploaded[1] = images;
    uploaded[2] = allTags;
/*concept credit: https://stackoverflow.com/users/687677/superluminary
at https://stackoverflow.com/questions/52078853/is-it-possible-to-update-filelist*/
    let list = new DataTransfer();
    for (i=0; i< uploaded[0].length; i++){
        list.items.add(uploaded[0][i]);
    }
    $("#uploaded-file")[0].files = list.files;
/* https://stackoverflow.com/users/687677/superluminary */
    console.log($("#uploaded-file")[0].files);
    return;
}

function showDelete(btn){
    $(btn).siblings().removeClass("hidden");
    return;
}

function hideDelete(btn){
    $(btn).siblings().addClass("hidden");
    return;
}

function deleteImg(btn){
    image = $(btn).attr("id").split("-");
    imageOutput = image[0];
    imageId = parseInt(imageOutput.slice(6,10));
    index = outputs.indexOf(imageId);
    imageName = images[index];
    uploadFiles.splice(index,1);
    images.splice(index,1);
    outputs.splice(index,1);
    $(`#${imageOutput}-container`).remove();
    window.setTimeout (function(){ 
       update();
    },100);
    return;
}


function addSymbol(input){
    $(".modal-header").empty();
    text = $(input).html();
    if (text == "@tag album here"){
        text = "";
    }
    lastChar = text.slice(-1);
    image = $(input).attr("id").split("-");
    imageOutput = image[0];
    src = $(`#${imageOutput}`).attr("src");
    if(src){
        $(".modal-header").append(`
            <img class="thumbnail-edit" src="${src}"/>
        `)
    }else{
        $(".modal-header").append(`
            <h3>Tag all</h3>
        `)
        imageOutput = "";
    }
    if(lastChar == "@"){
        //$(input).val(text);
        $("#edit-file-tag").val(text);
        $("#output-file").html(imageOutput);
    }else{
        //$(input).val(`${text}@`);
        $("#edit-file-tag").val(`${text}@`);
        $("#output-file").html(imageOutput);
    };
    window.setTimeout (function(){ 
       $("#edit-file-tag").focus();
    },100);
    return;
}

//credit: https://stackoverflow.com/users/2065039/guruprasad-j-rao
function preventComma() {
    if(event.keyCode === 44 ) {
        alert("comma not allowed");
        event.preventDefault();
    }
};
//at https://stackoverflow.com/questions/32096193/how-to-prevent-default-on-keypress-for-certain-event-but-then-bring-back-the-def

function editTagFile(){
    $(".modal-header").empty();
    editedTag = $(".modal-body").children().first().val();
    image = $("#output-file").html();
    imageId = parseInt(image.slice(6,10));
        $("#tag-all-slot").html(editedTag);
        allTags = editedTag;
        $("#all-tags").val(editedTag);
    return;
}