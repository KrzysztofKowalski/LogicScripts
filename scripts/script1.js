

var canSeeEnemy = true;
var hasStartedPatrol = false;
var goalLoc = [0, 0];
var xArrived = false;
var yArrived = false;

var deX;
var acX;
var deY;
var acY;

function useAI(owner)
{
    //hasArrived(owner, goalLoc); 

    if(canSeeEnemy)
    {
        chaseObject(owner, playerCharacter);
    }
    else if(!hasStartedPatrol && !canSeeEnemy)
    {
        xArrived = false;
        yArrived = false;
        aiPatrol(owner);
        hasStartedPatrol = true;
        console.log("started");
    }
}

function aiPatrol(owner)
{
    goalLoc = getNewLocation();
    //console.log(goalLoc);

    if(goalLoc[0] < owner.xLocation)
    {
        nAX = setInterval(nAccelerateX, 16, owner);
    }
    if(goalLoc[0] > owner.xLocation)
    {
        acX = setInterval(accelerateX, 16, owner);
    }

    if(goalLoc[1] < owner.yLocation)
    {
        nAY = setInterval(nAccelerateY, 16, owner);
    }
    if(goalLoc[1] > owner.yLocation)
    {
        acY = setInterval(accelerateY, 16, owner);
    }
}

function hasArrived(owner, goal)
{
    

    if(owner.xAcceleration > 0 && owner.xLocation + owner.xAcceleration + owner.objWidth >= goal[0])
    {
        console.log("foundX");
        //clearInterval(nAX);
        clearInterval(acX);
        decelerateX(owner);
        xArrived = true;
    }
    if(owner.xAcceleration < 0 && owner.xLocation + owner.xAcceleration <= goal[0])
    {
        console.log("foundX");
        clearInterval(nAX);
        //clearInterval(acX);
        decelerateX(owner);
        xArrived = true;
    }

    if(owner.yAcceleration > 0 && owner.yLocation + owner.yAcceleration + owner.objHeight >= goal[0])
    {
        console.log("foundY");
        //clearInterval(nAY);
        clearInterval(acY);
        decelerateY(owner);
        yArrived = true;
    }
    if(owner.yAcceleration < 0 && owner.yLocation + owner.yAcceleration <= goal[0])
    {
        
        console.log("foundY");
        clearInterval(nAY);
        //clearInterval(acY);
        decelerateY(owner);
        yArrived = true;
        
    }
    if((xArrived && yArrived) || (yArrived && xArrived))
    {
        console.log("finished patrol");
        hasStartedPatrol = false;
    }
}

function chaseObject(owner, objectToChase)
{
    if(objectToChase.xLocation < owner.xLocation + owner.objWidth)
    {
        owner.xAcceleration--;
    }
    if(objectToChase.xLocation > owner.xLocation + objectToChase.objWidth)
    {
        owner.xAcceleration++;
    }

    if(objectToChase.yLocation < owner.yLocation + objectToChase.objHeight)
    {
        owner.yAcceleration--;
    }
    if(objectToChase.yLocation > owner.yLocation + owner.objHeight)
    {
        owner.yAcceleration++;
    }
}

function getNewLocation()
{
    var xGoal = WIDTH * Math.random();
    var yGoal = HEIGHT * Math.random();
    return [xGoal, yGoal];
}

function accelerateX(owner)
{
    owner.xAcceleration++;
}
function nAccelerateX(owner)
{
    owner.xAcceleration--;
}
function accelerateY(owner)
{
    owner.yAcceleration++;
}
function nAccelerateY(owner)
{
    owner.yAcceleration--;
}

function decelerateX(owner)
{
    owner.xAcceleration = 0;
}
function decelerateY(owner)
{
    owner.yAcceleration = 0;
}