'use strict';
function  createShoppingList(inputs) {
    let barcode=[];
    let count=[];
    let newTags=[];
    barcode[0]=inputs[0];
    count[0]=0;
    let t=0;
    for(let i=0;i<inputs.length;i++){
        if(inputs[i].length===10){
            if(inputs[i]===barcode[t]){
                count[t]++;
            }else{
                barcode[++t]=inputs[i];
                count[t]=1;
            }
        }else{
            let shortArray=inputs[i].split("-");
              if(barcode[t]===shortArray[0]){
                  count[t]+=parseFloat(shortArray[1]);
              }else{
                  barcode[++t]=shortArray[0];
                  count[t]=parseFloat(shortArray[1]);
              }

        }
    }
    for(let j=0;j<barcode.length;j++){
        newTags.push({
            barcode:barcode[j],
            count:count[j]
        });
    }
    return newTags;
}
function  saveList(inputs) {
    const allPromotion = Promotion.all();
       for(let i=0;i<inputs.length;i++){
           let countArray=inputs[i].barcode;
           if(allPromotion[0].barcodes.indexOf(countArray)!==-1){
               inputs[i].less=1;
           }else{
               inputs[i].less=0;
           }
       }

       return inputs;
}
function getPrintMenu(inputs) {
    let total=0;
    let save=0;
    let printList=[];
    let allTtem=Item.all();
    printList.push('***<没钱赚商店>收据***\n');
    printList.push('----------------------\n');
           for(let i=0;i<inputs.length;i++){
               for(let j=0;j<allTtem.length;j++){
                   if(inputs[i].barcode===allTtem[j].barcode){
                       printList.push('名称：'+allTtem[j].name+'，数量：'+inputs[i].count+allTtem[j].unit+'，单价：'+allTtem[j].price.toFixed(2)+'(元)，小计：'+((inputs[i].count-inputs[i].less)*allTtem[j].price).toFixed(2)+'(元)\n');
                       total += (inputs[i].count-inputs[i].less)*allTtem[j].price;
                       save += allTtem[j].price*inputs[i].less;
                   }
               }
           }
    printList.push('----------------------\n');
    printList.push('总计：'+total.toFixed(2)+'(元)\n');
    printList.push('节省：'+save.toFixed(2)+'(元)\n')
    printList.push('**********************');
    return printList.join('');
}
function  printReceipt(tags) {
    let newTags=createShoppingList(tags);
    let newTagsList=saveList(newTags);
    console.log(getPrintMenu(newTagsList));
}
