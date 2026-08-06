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



    try{
        const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: message,
            source: from,
            target: to,
            format: "text",
            alternatives: 3,
            api_key: ""
        }),
            headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) throw new Error("Translation request failed");


        const result = await res.json()
        if(result.translatedText){
            if(english.value !== ""){
                arabic.value = result.translatedText
            }else if(arabic.value !== ""){
                english.value = result.translatedText
            }
        }
        else{
            throw new Error("sorry we cannot translate this!🙏");
        }
    }catch(err){
        english.value == ""? english.value = err : arabic.value = err 
    }
    
    


})








