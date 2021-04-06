function Gallery(gallery) {
    if (!gallery){
    throw new Error("No Gallery Found!");
    }

    //select the elements we need

    const images = Array.from(gallery.querySelectorAll("img"));
    // console.log(images);

    const modal = document.querySelector(".modal");
    const prev = modal.querySelector(".prev");
    const next = modal.querySelector(".next");
    let currentImage;

    function openModal(){
        console.info("Opening Modal");
        //first check if the modal is already open
        if(modal.matches(".open")){
            console.info("modal already open");
            return; //stop the function from running
        }
        modal.classList.add("open");

        //event listeners to be bound when we open the modal
        window.addEventListener("keyup", handleKeyUp);
        next.addEventListener("click", showNextImage);
        prev.addEventListener("click", showPrevImage);
    }

    function closeModal(){
        modal.classList.remove("open");

        //event listeners to be removed when we open the modal
        window.removeEventListener("keyup", handleKeyUp);
        next.removeEventListener("click", showNextImage);
        prev.removeEventListener("click", showPrevImage);
        
        //add eventlisteners for keyboard and clicks
    }

    function handleClickOutside(e){
        // console.log(e.target);
        // console.log(e.currentTarget);

        if (e.target === e.currentTarget){
            closeModal();
        }
    }

    function handleKeyUp(e){
        if (e.key === "Escape"){
            return closeModal();
        }

        if (e.key === "ArrowRight"){
            return showNextImage();
        }

        if (e.key == "ArrowLeft"){
            return showPrevImage();
        }
    }

    function showNextImage(){
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }
    function showPrevImage(){
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function showImage(el){
        if (!el){
            console.info("No image to show");
            return;
        }
        console.log(el)
        modal.querySelector("img").src = el.src;
        modal.querySelector("h2").textContent = el.title;
        modal.querySelector("figure p").textContent = el.dataset.description;
        currentImage = el;
        openModal();
    }

    // function handleImageClick(event){
    //     showImage(event.currentTarget);
    // }

    // images.forEach((image)=>{
    //     image.addEventListener("click", handleImageClick);
    // });

    //these are our event listeners
    images.forEach((image)=>{
        image.addEventListener("click",(e)=>{
            showImage(e.currentTarget);
        })
    });

    
    images.forEach((image)=>{
        image.addEventListener("keyup", (e)=>{
            if(e.key==="Enter"){
                showImage(e.currentTarget);
            }
        })
    })

    modal.addEventListener("click", handleClickOutside);
    
}

//use it on the page

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));