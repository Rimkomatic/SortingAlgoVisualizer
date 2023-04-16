const barContainer=document.getElementById('bar-container')
const shortBtn=document.getElementById('short-btn')
const tl = gsap.timeline({duration:0.001})
const slider=document.getElementById('slider')
const select=document.getElementById('select')



let algoNum=select.value
console.log(algoNum)
let totalWidth=window.innerWidth

window.addEventListener("resize",()=>{
    totalWidth=window.innerWidth
})


class BarItem
{
    constructor(value,position,dom)
    {
        this.value = value
        this.position = position
        this.dom = dom
        this.xAxisVal = position*calcWidthPixel(NUMBEROFBARS)
        this.actualPosition=0
    }
}

let arraybar=[]


let NUMBEROFBARS=20
addIdem(NUMBEROFBARS)

slider.addEventListener('input',()=>{
    NUMBEROFBARS=slider.value
   
    while (barContainer.firstChild) 
    {
        barContainer.removeChild(barContainer.lastChild);
    }
    arraybar=[]
    console.log(NUMBEROFBARS)
    addIdem(NUMBEROFBARS)
    console.log(arraybar.length)
    
})

select.addEventListener('change',()=>{
    algoNum=select.value
})


shortBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    
    if(algoNum == 0)
    {
        console.log("running normal Sort")
        normalSort()
    }
    else if(algoNum==1)
    {
        console.log("running bubble Sort")
        bubbleSort()
    }
    else if(algoNum == 2)
    {
        console.log("running insertion Sort")
        insertionSort()
    }
    else if(algoNum==3)
    {
        console.log("running selection Sort")
        selectionSort()
    }
    else
    {
        console.log("running heap Sort")
        heapSort()
    }
})








// !------------------------------------------------------
// ! SWAP(  --->   ,  <---- )
//!--------------------------------------------------------





// !--------------------------------------------------------------------------------------------------------------------------------------------------
// **************************************************************************************************************************************************
// !------------------------------------- FUNCTION DEFINATIONS ---------------------------------------------------------------------------------------
// **************************************************************************************************************************************************
// !--------------------------------------------------------------------------------------------------------------------------------------------------



function getPosX(i)
{
    return arraybar[i].xAxisVal
}





function calcWidthPixel(nums)
{
    return totalWidth/nums
}

function calcWidth(nums)
{
    let retVal= 100/nums;
    retVal = retVal+'%'
    return retVal
}

function swap(i,j)
{
    let temp = arraybar[i].value
    arraybar[i].value=arraybar[j].value
    arraybar[j].value=temp

    let heighti=arraybar[i].value+'%'
    let heightj=arraybar[j].value+'%'

    tl.to(arraybar[i].dom,{height:heighti})
    tl.to(arraybar[j].dom,{height:heightj},'-=0.5')


}

// function swap(i,j)
// {
//     let dom1=arraybar[i].dom
//     let dom2=arraybar[j].dom

//     let xi=arraybar[i].xAxisVal
//     let xj=arraybar[j].xAxisVal

//     let pos1=xj-xi
//     let pos2=xi-xj

//     let offseti=arraybar[i].actualPosition
//     let offsetj=arraybar[j].actualPosition
    
//     let moveAmout1=pos1+offseti
//     if(moveAmout1===0)
//     {
//         moveAmout1=pos1
//     }
//     let moveAmout2=pos2+offsetj
//     if(moveAmout2===0)
//     {
//         moveAmout2=pos2
//     }

//     // tl.to(dom1,{x:0,duration:0.01})
//     tl.to(dom1,{x:moveAmout1})
//     // tl.to(dom1,{x:0,duration:0.01})
//     tl.to(dom2,{x:moveAmout2})

//     // arraybar[i].dom.style.left=pos1

//     arraybar[i].actualPosition=arraybar[i].actualPosition+pos1
//     arraybar[j].actualPosition=arraybar[j].actualPosition+pos2

//     arraybar[i].xAxisVal=j*calcWidthPixel(NUMBEROFBARS)
//     arraybar[j].xAxisVal=i*calcWidthPixel(NUMBEROFBARS)


//     // arraybar[i].dom.parentNode.insertBefore(arraybar[i].dom, arraybar[j].dom);

//     // let tempHold=arraybar[i]
//     // arraybar[i]=arraybar[j]
//     // arraybar[j]=tempHold

//     // console.log(arraybar)
//     checkError()
// }

function addIdem(nums)
{
    let width = calcWidth(nums)
    let index=0
    while(nums!=0)
    {
        let height
        do{
            height=Math.floor(Math.random()*100)
        }while(height===0)
        
        let heightPercent=height+'%'

        const newBar=document.createElement('div')
        newBar.classList.add("bar-item")
        
        newBar.style.height=heightPercent
        newBar.style.width=width
        newBar.style.color='#fff'
        // newBar.innerText=index
        barContainer.appendChild(newBar)

        let newBarObject = new BarItem(height,index,newBar)
        arraybar.push(newBarObject)

        index=index+1
        nums=nums-1;
    }
    
}

function colorize(item)
{
    let mainClr=item.style.backgroundColor
    item.style.backgroundColor="#fff"
    return mainClr
}

function backColor(item,mainClr)
{
    item.style.backgroundColor=mainClr
}

// !------------------------------------- ALGOS -------------------------------------------

function bubbleSort(){

   
    for(let i = 0; i < arraybar.length; i++){

        
        for(let j = 0; j < arraybar.length - i - 1; j++)
        {
            if(arraybar[j + 1].value < arraybar[j].value)
            {
                swap(j,j+1)
            }
        }
    }
   
}

function normalSort()
{
    for(let i=0;i<NUMBEROFBARS;i++)
    {
        for(let j=i+1;j<NUMBEROFBARS;j++)
        {
            if(arraybar[i].value>arraybar[j].value)
            {
                swap(i,j)
            }
        }
    }
}

function insertionSort() 
{
    for (let i = 1; i < arraybar.length; i++) {
      let j = i - 1;
      let temp = arraybar[i].value
      while (j >= 0 && arraybar[j].value > temp) {
        swap(j,j+1)
        j--;
      }
      arraybar[j + 1].value = temp;
    }
}

function selectionSort() 
{

    for (let i = 0; i < arraybar.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arraybar.length; j++) {
        if (arraybar[j].value < arraybar[minIndex].value) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        swap(i, minIndex);
      }
    }
}


function heapSort() {
    // Build max heap
    for (let i = Math.floor(arraybar.length / 2) - 1; i >= 0; i--) {
      heapify(arraybar, i, arraybar.length);
    }
  
    // Heap sort
    for (let i = arraybar.length - 1; i >= 0; i--) {
      // Move current root to end
      swap(0, i);
  
      // Max heapify the remaining elements
      heapify(arraybar, 0, i);
    }
  }
  
  function heapify(arraybar, i, n) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
  
    if (left < n && arraybar[left].value > arraybar[largest].value) {
      largest = left;
    }
  
    if (right < n && arraybar[right].value > arraybar[largest].value) {
      largest = right;
    }
  
    if (largest !== i) {
      swap(i, largest);
      heapify(arraybar, largest, n);
    }
  }