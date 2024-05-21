ingredientField=document.getElementById('ingredientField');
titleField=document.getElementById('titleField');
instructionField=document.getElementById('instructionField');

addIngredientButton=document.getElementById('addIngredientButton');
addInstructionButton=document.getElementById('addInstructionButton');

ingredientBox=document.getElementById('ingredientBox');
instructionBox=document.getElementById('instructionBox');

addIngredientButton.addEventListener('click', () => {
  addIngredient(ingredientField.value);
});
addInstructionButton.addEventListener('click', () => {
  addInstruction(instructionField.value);
});

ingredientField.addEventListener('keypress', (e) => {
  if(e.key==="Enter") {
    addIngredient(ingredientField.value);
  }
});
instructionField.addEventListener('keypress', (e) => {
  if(e.key==="Enter") {
    addInstruction(instructionField.value);
  }
});

function addIngredient(ingredient) {
  if(ingredient!=='') {
    ingredientField.value='';
    let ingredientItem = document.createElement('button');
    ingredientItem.classList.add('ingredientItem');
    ingredientItem.innerHTML=ingredient;
    ingredientItem.addEventListener('click',(e) => {
      e.target.remove();
    });
    ingredientBox.appendChild(ingredientItem);
  }
}
function addInstruction(instruction) {
  if(instruction!=='') {
    instructionField.value='';
    let instructionItem = document.createElement('button');
    instructionItem.classList.add('instructionItem');
    instructionItem.innerHTML=instruction;
    instructionItem.addEventListener('click',(e) => {
      e.target.remove();
      //change height of ingredientBox
      if(instructionBox.children.length*40>200) {
        instructionBox.style.height=instructionBox.children.length*40+"px";
      }
    });
    instructionBox.appendChild(instructionItem);

    //change height of ingredientBox
    if(instructionBox.children.length*40>instructionBox.getBoundingClientRect().height) {
      instructionBox.style.height=instructionBox.children.length*40+"px";
    }
  }
}

class Recipe {
  constructor(title, ingredients, instructions) {
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}

document.getElementById('saveRecipeCardButton').addEventListener('click',()=> {
  let t=titleField.value;
  ing=[]
  for(const item of ingredientBox.children) {
    ing.push(item.innerHTML)
  }
  inst=[]
  for(const item of instructionBox.children) {
    inst.push(item.innerHTML)
  }
  let r = new Recipe(t,ing,inst);
  writeRecipeToFile(r)
  ingredientBox.innerHTML='';
  instructionBox.innerHTML='';
  titleField.value='';
});

document.getElementById('resetButton').addEventListener('click',()=> {
  ingredientBox.innerHTML='';
  instructionBox.innerHTML='';
  titleField.value='';
});

function writeRecipeToFile(recipe) {
  // taking from
  function download(text, filename){
    var blob = new Blob([text], {type: "text/html"});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  const output = `
    <html>
      <head>
        <style>
          :root {
            font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
          }
          h1 {
            background-color: rgb(15,35,57);
            color: white;
            padding: 16px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          .b-main {
            width: 600px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
          }
          .b-content {
            padding: 16px;
            display: flex;
            gap: 16px;
          }
          .b-ingredients {
            flex: 1
          }
          .b-instructions {
            flex: 1'
          }
        </style>
      </head>
      <body>
        <main class="b-main">
          <h1>${recipe.title}</h1>
          <div class="b-content">
            <div class="b-ingredients">
              <strong>Ingredients</strong>
              <hr>
              ${
                recipe.ingredients.map(i => (
                  `
                    <div>${i}</div>
                  `
                )).join('')
              }
            </div>
            <div class="instructions">
              <strong>Instructions</strong>
              <hr>
              ${
                recipe.instructions.map((i, index) => (
                  `
                    <div>${index+1}: ${i}</div>
                  `
                )).join('')
              }
            </div>
          </div>
        </main>
      </body>
    </html>
  `;
  download(output, `recipe-card.html`);
}