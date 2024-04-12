let todayDate=("0"+new Date().getDate()).slice(-2);
let todayMonth=(new Date().getMonth())+1;
todayMonth=("0"+todayMonth).slice(-2);
let todayYear=new Date().getFullYear();
let todayFullDate=`${todayYear}-${todayMonth}-${todayDate}`;
// Input Date Restriction
let startDateInput=document.querySelector('#start-date');
startDateInput.max=todayFullDate;
let endDateInput=document.querySelector('#end-date');
endDateInput.min=todayFullDate;

let intervalID;
calculate();
function calculate(){
    clearInterval(intervalID);
    let startDate=document.querySelector('#start-date').value;
    let endDate=document.querySelector('#end-date').value;
    if(startDate=='' || endDate==''){
        alert('Please select start and end date. \nBina date ke kya hi calculate karu?');
        return;
    }
    let startYear=startDate.slice(0,4);
    let endYear=endDate.slice(0,4);
    let startMonth=startDate.slice(5,7)-1;
    let endMonth=endDate.slice(5,7)-1;
    let startDay=startDate.slice(8,10);
    let endDay=endDate.slice(8,10); 
    endDay=eval(`${endDay}+1`);   // to make end date inclusive
    let startDateObj=new Date(startYear,startMonth,startDay);
    let endDateObj=new Date(endYear,endMonth,endDay);
    updateTime(startDateObj,endDateObj)
}

function updateTime(startDateObj,endDateObj){
    intervalID=setInterval(()=>{
        let today=new Date();
        let totalHours=Math.trunc((endDateObj.getTime()-startDateObj.getTime())/1000/60/60);
        let elapsedHours=Math.trunc((today.getTime()-startDateObj.getTime())/1000/60/60);
        let diffInMilliSec=endDateObj.getTime()-today.getTime();
        let hoursLeft=Math.trunc(diffInMilliSec/1000/60/60);
        let minutesLeft=Math.trunc(((diffInMilliSec/1000/60/60)%1)*60);
        minutesLeft=("0"+minutesLeft).slice(-2);
        let secondsLeft=Math.trunc(((((diffInMilliSec/1000/60/60)%1)*60)%1)*60);
        secondsLeft=("0"+secondsLeft).slice(-2);
        let milliSecLeft=Math.trunc(((((((diffInMilliSec/1000/60/60)%1)*60)%1)*60)%1)*1000);
        milliSecLeft=("00"+milliSecLeft).slice(-3);
        display(hoursLeft,minutesLeft,secondsLeft,milliSecLeft,totalHours,elapsedHours);
    },1)
}


function display(hoursLeft,minutesLeft,secondsLeft,milliSecLeft,totalHours,elapsedHours){
    let displayElement=document.querySelector('.display');
    displayElement.innerHTML=`
    <div class="total-and-elapsed">
        <div class="total">
            <div class="info-text">Total Hours</div>
            <div class="info-data">${totalHours}</div>
        </div>
        <div class="elapsed">
            <div class="info-text">Elapsed Hours</div>
            <div class="info-data">${elapsedHours}</div>
        </div>
    </div>
    <div class="remaining-top">
        <span class="remaining-top-text">Remaining Time</span>
    </div>
    <div class="remaining">
        <div class="remaining-hours remaining-block">
            <div class="remaining-text">Hours</div>
            <div class="remaining-data">${hoursLeft}</div>
        </div>
        <div class="colon">:</div>
        <div class="remaining-minutes remaining-block">
            <div class="remaining-text">Minutes</div>
            <div class="remaining-data">${minutesLeft}</div>
        </div>
        <div class="colon">:</div>
        <div class="remaining-seconds remaining-block">
            <div class="remaining-text">Seconds</div>
            <div class="remaining-data">${secondsLeft}</div>
        </div>
        <div class="colon">:</div>
        <div class="remaining-milliSeconds remaining-block">
            <div class="remaining-text">Milli-seconds</div>
            <div class="remaining-data">${milliSecLeft}</div>
        </div>
    </div>
    <div class="controls">
        <button id="stop-btn" onclick="stop();">Stop</button>
        <button id="reset-btn" onclick="reset();">Reset</button>
    </div>`;
}

//controls button
let stop=()=>alert('समय रोकने से नहीं रुकता। \nकाम करो, बक*दी नही।');
let reset=()=>{
    clearInterval(intervalID);
    document.querySelector('.display').innerHTML='';
    document.querySelector('#start-date').value='';
    document.querySelector('#end-date').value='';
}
