const english = document.querySelector(".english")
const sendbtn = document.querySelector(".send")
const arabic = document.querySelector(".arabic")



sendbtn.addEventListener("click",async (e)=>{
    e.preventDefault()
    let from = "";
    let to = "";
    let message = ""
    if(english.value === "" && arabic.value === ""){
        alert("hey you shoud write any word")
    }else if(english.value !== ""){
        from = "en"
        to = "ar"
        message = english.value 
    }else{
        from = "ar"
        to = "en"
        message = arabic.value 
    }
    sendbtn.textContent = "..."

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(message)}&langpair=${from}|${to}`;

        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to translate");

        const result = await res.json();

        if (result.responseStatus === 200) {
            if (english.value !== "") {
                arabic.value = result.responseData.translatedText;
            } else {
                english.value = result.responseData.translatedText;
            }
        } else {
            throw new Error(result.responseDetails);
        }

    } catch (err) {
        alert(err.message);
    }
    sendbtn.textContent = "➤"
})
english.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendbtn.click();
    }
});

arabic.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendbtn.click();
    }
});








