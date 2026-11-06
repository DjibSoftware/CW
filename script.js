let currentUser = 0
let currentGif = ``

document.addEventListener("DOMContentLoaded", () => {
    let URL = `https://683c2a7f28a0b0f2fdc65cc4.mockapi.io/AI`;
    document.getElementById("loading").showModal()

    //User Selection&Syncing
    setTimeout(() => {
        fetch(`${URL}/1`, {
                method: "GET"
            }).then(response => response.json())
            .then(data => {
                if (data.user === `none`) {
                    fetch(`${URL}/1`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user: "taken"
                        })
                    })
                    currentUser = 1
                    if (localStorage.getItem("Username")) {
                        document.getElementById("User").style.display = `none`
                        document.getElementById("username").innerHTML = localStorage.getItem("Username")

                    } else {
                        document.getElementById("User").showModal()
                    }
                    document.getElementById("loading").close()
                    document.getElementById("loading").style.display = `none`
                    document.getElementById("serverReset").close()
                    document.getElementById("serverReset").style.display = `none`
                    document.getElementById("middle").innerHTML = ``
                } else {
                    fetch(`${URL}/2`, {
                            method: "GET"
                        }).then(response => response.json())
                        .then(data => {
                            if (data.user === `none`) {
                                fetch(`${URL}/2`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        user: "taken"
                                    })
                                })
                                currentUser = 2
                                if (localStorage.getItem("Username")) {
                                    document.getElementById("User").style.display = `none`
                                    document.getElementById("username").innerHTML = localStorage.getItem("Username")
                                } else {
                                    document.getElementById("User").showModal()
                                }
                                document.getElementById("loading").close()
                                document.getElementById("loading").style.display = `none`
                                document.getElementById("serverReset").close()
                                document.getElementById("serverReset").style.display = `none`
                                document.getElementById("middle").innerHTML = ``
                            } else {
                                document.getElementById("resetBtn").style.display = `block`
                            }
                        })
                }
            })
    }, 5000);


})

// reseting server
function servReset() {
    let URL = `https://683c2a7f28a0b0f2fdc65cc4.mockapi.io/AI`;
    if (document.getElementById("pass").value.trim() != '' && document.getElementById("pass").value.trim() === `07020702`) {
        fetch(`${URL}/1`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: "none"
                })
            })
            .then(() => {
                fetch(`${URL}/2`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user: "none"
                    })
                }).then(() => {
                    location.reload()
                    console.log("reset done")
                    document.getElementById("serverReset").close()
                    document.getElementById("serverReset").style.display = `none`
                    document.getElementById("resetBtn").style.display = `none`
                    document.getElementById("loading").close()
                    document.getElementById("loading").style.display = `none`
                    document.getElementById("middle").innerHTML = ``
                })
            })
    }
}

//set username
function UseSet() {
    if (document.getElementById("UserInput").value.trim() === "") {
        console.log("Error 19")
    } else {
        document.getElementById("username").innerHTML = `${document.getElementById("UserInput").value}`
        document.getElementById("User").close()
        document.getElementById("User").style.display = `none `
        localStorage.setItem("Username", `${document.getElementById("UserInput").value}`)
    }
}


//sending Messages
function sendMessage() {
    let URL = `https://683c2a7f28a0b0f2fdc65cc4.mockapi.io/AI`;
    let inp = document.getElementById("inpBar")
    let middle = document.getElementById("middle")
    if (currentUser === 1 && inp.value.trim() != ``) {
        fetch(`${URL}/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                msg: `${inp.value}`,
                status: `new`
            })
        }).then(() => {
            middle.innerHTML += `<p style="max-width: 60%; width: fit-content; background-color: rgb(0, 151, 252); color: white;  padding: 10px; border-radius: 0px 10px 10px 10px;">${inp.value}</p>`
            inp.value = ``
        })
    } else if (currentUser === 2 && inp.value.trim() != ``) {
        fetch(`${URL}/2`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                msg: `${inp.value}`,
                status: `new`
            })
        }).then(() => {
            middle.innerHTML += `<p style="max-width: 60%; width: fit-content; background-color: rgb(0, 151, 252); color: white;  padding: 10px; border-radius: 0px 10px 10px 10px;">${inp.value}</p>`
            inp.value = ``
        })
    }
}

//Enter press
document.addEventListener("keypress", (e) => {
    if (e.key === `Enter`) {
        sendMessage()
    }
})

//Receiving messages
setInterval(() => {
    let URL = `https://683c2a7f28a0b0f2fdc65cc4.mockapi.io/AI`;
    let middle = document.getElementById("middle")
    if (currentUser === 1) {
        fetch(`${URL}/2`, {
                method: "GET"
            }).then(response => response.json())
            .then(data => {
                if (data.status != `fetched`) {
                    middle.innerHTML += `<div class="parent" style="display: flex; justify-content: flex-end;"><p style="margin-left: auto; max-width: 60%; width: fit-content; background-color: rgb(41, 49, 54); color: white;  padding: 10px; border-radius: 10px 0px 10px 10px;">${data.msg}</p></div>`
                    fetch(`${URL}/2`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            status: "fetched"
                        })
                    })
                }
            })
    } else {
        fetch(`${URL}/1`, {
                method: "GET"
            }).then(response => response.json())
            .then(data => {
                if (data.status != `fetched`) {
                    middle.innerHTML += `<div class="parent" style="display: flex; justify-content: flex-end;"><p style="margin-left: auto; max-width: 60%; width: fit-content; background-color: rgb(41, 49, 54); color: white;  padding: 10px; border-radius: 10px 0px 10px 10px;">${data.msg}</p></div>`
                    fetch(`${URL}/1`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            status: "fetched"
                        })
                    })
                }
            })
    }
}, 1000);

//fetch Images/GIFS
function sendGif() {
    let URL = `https://683c2a7f28a0b0f2fdc65cc4.mockapi.io/AI`;
    document.getElementById("gifsImg").close()
    document.getElementById("gifsImg").style.display = `none`
    if (currentUser === 1) {
        fetch(`${URL}/3`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imageOne: `${currentGif}`
            })
        }).then(() => {
            document.getElementById("gifsImg").close()
            document.getElementById("gifsImg").style.display = `none`
            if (currentGif === `gattouz`) {
                document.getElementById("middle").innerHTML += ` <img style="border-radius: 10px;" src="https://media.tenor.com/5GBuNQdyHL0AAAAM/ad-laurent-fusion.gif" alt="gattouz" width="100px" height="100px">`
            } else if (currentGif === `MiaK`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/eDPqjzF8yhAAAAAM/mia-khalifa-mia.gif" alt="MiaK" width="100px" height="100px">`
            } else if (currentGif === `seriously`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/bgo1Qr8CvPgAAAAM/looking-serious.gif" alt="seriously" width="100px" height="100px">`
            } else if (currentGif === `oldMan`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/jm1-sKpAykQAAAAM/bruh-really.gif" alt="oldMan" width="100px" height="100px">`
            } else if (currentGif === `hellNah`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/Y_LH4fKgpqAAAAAM/tiktok-meme-tiktok.gif" alt="hellNah" width="100px" height="100px">`
            } else if (currentGif === `WaitAMinute`) {
                document.getElementById("middle").innerHTML += `            <img style="border-radius: 10px;" src="https://media.tenor.com/xs08BdM6dEYAAAAM/maga-maga-ling.gif" alt="WaitAMinute" width="100px" height="100px">`
            } else if (currentGif === `fiveStars`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/IrJGIKLZ-M4AAAAM/five-stars-5-stars.gif" alt="fiveStars" width="100px" height="100px">`
            } else if (currentGif === `crazyMonster`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/n9LhTZez6yAAAAA1/crazy-monster-stan-twitter.webp" alt="crazyMonster" width="100px" height="100px">`
            } else if (currentGif === `shocked`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/fK_4h5l7fCoAAAAm/lsg.webp" alt="shocked" width="100px" height="100px">`
            } else if (currentGif === `jackpot`) {
                document.getElementById("middle").innerHTM += `<img style="border-radius: 10px;" src="https://media.tenor.com/8QdLOsSoECwAAAA1/struck-gold-jackpot.webp" alt="jackpot" width="100px" height="100px">`
            }
        }).catch(error => console.log(error))
    } else {
        fetch(`${URL}/3`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imageTwo: `${currentGif}`
            })
        }).then(() => {
            document.getElementById("gifsImg").close()
            document.getElementById("gifsImg").style.display = `none`
            if (currentGif === `gattouz`) {
                document.getElementById("middle").innerHTML += ` <img style="border-radius: 10px;" src="https://media.tenor.com/5GBuNQdyHL0AAAAM/ad-laurent-fusion.gif" alt="gattouz" width="100px" height="100px">`
            } else if (currentGif === `MiaK`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/eDPqjzF8yhAAAAAM/mia-khalifa-mia.gif" alt="MiaK" width="100px" height="100px">`
            } else if (currentGif === `seriously`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/bgo1Qr8CvPgAAAAM/looking-serious.gif" alt="seriously" width="100px" height="100px">`
            } else if (currentGif === `oldMan`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/jm1-sKpAykQAAAAM/bruh-really.gif" alt="oldMan" width="100px" height="100px">`
            } else if (currentGif === `hellNah`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/Y_LH4fKgpqAAAAAM/tiktok-meme-tiktok.gif" alt="hellNah" width="100px" height="100px">`
            } else if (currentGif === `WaitAMinute`) {
                document.getElementById("middle").innerHTML += `            <img style="border-radius: 10px;" src="https://media.tenor.com/xs08BdM6dEYAAAAM/maga-maga-ling.gif" alt="WaitAMinute" width="100px" height="100px">`
            } else if (currentGif === `fiveStars`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/IrJGIKLZ-M4AAAAM/five-stars-5-stars.gif" alt="fiveStars" width="100px" height="100px">`
            } else if (currentGif === `crazyMonster`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/n9LhTZez6yAAAAA1/crazy-monster-stan-twitter.webp" alt="crazyMonster" width="100px" height="100px">`
            } else if (currentGif === `shocked`) {
                document.getElementById("middle").innerHTML += `<img style="border-radius: 10px;" src="https://media.tenor.com/fK_4h5l7fCoAAAAm/lsg.webp" alt="shocked" width="100px" height="100px">`
            } else if (currentGif === `jackpot`) {
                document.getElementById("middle").innerHTM += `<img style="border-radius: 10px;" src="https://media.tenor.com/8QdLOsSoECwAAAA1/struck-gold-jackpot.webp" alt="jackpot" width="100px" height="100px">`
            }
        }).catch(error => console.log(error))
    }
}

//Receive Images and Gifs
setInterval(() => {
    let URL = `https://683c2a7f28a0b0f2fdc65cc4.mockapi.io/AI`;

    if (currentUser === 1) {
        fetch(`${URL}/3`, {
                method: "GET",
            }).then(response => response.json())
            .then(data => {
                if (data.imageTwo != ``) {
                    if (data.imageTwo === `gattouz`) {
                        document.getElementById("middle").innerHTML += ` <img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/5GBuNQdyHL0AAAAM/ad-laurent-fusion.gif" alt="gattouz" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `MiaK`) {
                        document.getElementById("middle").innerHTML += `<img style=" margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/eDPqjzF8yhAAAAAM/mia-khalifa-mia.gif" alt="MiaK" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `seriously`) {
                        document.getElementById("middle").innerHTML += `<img style=" margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/bgo1Qr8CvPgAAAAM/looking-serious.gif" alt="seriously" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `oldMan`) {
                        document.getElementById("middle").innerHTML += `<img style=" margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/jm1-sKpAykQAAAAM/bruh-really.gif" alt="oldMan" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `hellNah`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/Y_LH4fKgpqAAAAAM/tiktok-meme-tiktok.gif" alt="hellNah" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `WaitAMinute`) {
                        document.getElementById("middle").innerHTML += `            <img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/xs08BdM6dEYAAAAM/maga-maga-ling.gif" alt="WaitAMinute" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `fiveStars`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/IrJGIKLZ-M4AAAAM/five-stars-5-stars.gif" alt="fiveStars" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `crazyMonster`) {
                        document.getElementById("middle").innerHTML += `<img style=" margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/n9LhTZez6yAAAAA1/crazy-monster-stan-twitter.webp" alt="crazyMonster" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `shocked`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/fK_4h5l7fCoAAAAm/lsg.webp" alt="shocked" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    } else if (data.imageTwo === `jackpot`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/8QdLOsSoECwAAAA1/struck-gold-jackpot.webp" alt="jackpot" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageTwo: ""
                            })
                        })
                    }
                }
            })
    } else {
        fetch(`${URL}/3`, {
                method: "GET",
            }).then(response => response.json())
            .then(data => {
                if (data.imageOne != ``) {
                    if (data.imageOne === `gattouz`) {
                        document.getElementById("middle").innerHTML += ` <img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/5GBuNQdyHL0AAAAM/ad-laurent-fusion.gif" alt="gattouz" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `MiaK`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/eDPqjzF8yhAAAAAM/mia-khalifa-mia.gif" alt="MiaK" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `seriously`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/bgo1Qr8CvPgAAAAM/looking-serious.gif" alt="seriously" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `oldMan`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/jm1-sKpAykQAAAAM/bruh-really.gif" alt="oldMan" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `hellNah`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/Y_LH4fKgpqAAAAAM/tiktok-meme-tiktok.gif" alt="hellNah" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `WaitAMinute`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/xs08BdM6dEYAAAAM/maga-maga-ling.gif" alt="WaitAMinute" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `fiveStars`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/IrJGIKLZ-M4AAAAM/five-stars-5-stars.gif" alt="fiveStars" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `crazyMonster`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/n9LhTZez6yAAAAA1/crazy-monster-stan-twitter.webp" alt="crazyMonster" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `shocked`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/fK_4h5l7fCoAAAAm/lsg.webp" alt="shocked" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    } else if (data.imageOne === `jackpot`) {
                        document.getElementById("middle").innerHTML += `<img style="margin-left:70%; border-radius: 10px;" src="https://media.tenor.com/8QdLOsSoECwAAAA1/struck-gold-jackpot.webp" alt="jackpot" width="100px" height="100px">`
                        fetch(`${URL}/3`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                imageOne: ""
                            })
                        })
                    }
                }
            })
    }
}, 2000);
