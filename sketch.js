var foodStock, dog, happyDog, database, dogImg1, dogImg2, milkImg, feedTime, lastFed, food, feedButton, addFood;

function preload(){

  dogImg1 = loadImage("images/dogImg.png");
	dogImg2 = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();

	createCanvas(500, 500);

	dog = createSprite(430, 220);
	dog.addImage(dogImg1);
	dog.scale = 0.1;

  fedTime = database.ref('feedTime');
  fedTime.on('value', (data) => {
    lastFed = data.val();
  });

  feedButton = createButton('Feed');
  feedButton.position(380,95);
  feedButton.mousePressed(feedDog);

  addFood = createButton('Add food');
  addFood.position(430, 95);
  addFood.mousePressed(moreFood);

  food = new Food();

	textAlign(CENTER);
	textSize(20);
	fill(255);
	stroke(0);
}

function draw() {

  background(46, 139, 87);

  food.getFoodStock();


  if (lastFed) {
    fill(255);
    textSize(15);
    if (lastFed>12) {
      text("Last feed: " + lastFed%12 + " PM", 350,30);
    } else if (lastFed<=12){
      text("Last feed: " + lastFed + " AM", 350,30);
    } else {
      text("Last feed: " + lastFed, 350,30);
    }
  }
  food.display();
  drawSprites();
}

function feedDog() {
  dog.addImage(dogImg2);

  if (foodStock) {
    food.updateFoodStock(1);
  }

  lastFed = hour();
  database.ref().update({feedTime: lastFed});

}

function moreFood() {
  foodStock++;
  database.ref().update({Food: foodStock});
}
