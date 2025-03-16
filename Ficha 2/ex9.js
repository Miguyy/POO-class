const randomNum =(limInf=0,limSup=1000)=>{
    let number=Math.floor(Math.random()*(limSup-limInf)+limInf)
    console.log(number)
}
randomNum()
