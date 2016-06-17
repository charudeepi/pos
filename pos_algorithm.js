"use strict";

var POS = POS || {};

POS = {

    countA: 0,
    countB: 0,
    countC: 0,
    countD: 0,
    priceA: 0, // A $2 each or 4 for $7.00
    priceB: 0, // B $12
    priceC: 0, // C $1.25 or $6 for a six pack
    priceD: 0, // D $0.15
    totalPrice: 0,
    validateC: true,
    codeInput: "",
    inputCode: "",
    boxAns: "",
    jBox: "",

    init: function () {

        this.inputCode = document.getElementById("code");
        this.boxAns = document.getElementById("ans");
        this.jBox = document.getElementById("j-box");

        document.getElementById("form-reset").onclick = function () {

            POS.clearCart();
        }

        document.onkeypress = function(){

            if(window.event.keyCode=='13'){
                POS.getTotalPrice();
                return false;
            }

        }

        //document.getElementById("form-submit").addEventListener('submit', function(evn){
        //    evn.preventDefault();
        //    POS.getTotalPrice();
        //},true);

        document.getElementById("form-submit").onclick = function() {
            POS.getTotalPrice();
        }
        
        this.inputCode.focus();


    },

    validateCode: function (code) {


        var regx = /([e-zE-Z])/,
            items = code.split(""),
            i = 0, j = 0;


        for (i = 0; i < items.length; i++) {

            if (regx.test(items[i])) {
                j++;
            }
        }

        if (j > 0) {
            return false;
        } else {
            return true;
        }

    },

    countItems: function () {

        this.codeInput = document.getElementById("code").value;

        var vCode = this.validateCode(this.codeInput);

        if (vCode) {

            var i = 0,
                items = this.codeInput.split("");

            for (i = 0; i < items.length; i++) {

                if (items[i] == "A" || items[i] == "a") {
                    this.countA++;
                } else if (items[i] == "B" || items[i] == "b"){
                    this.countB++;
                }else if (items[i] == "C" || items[i] == "c"){
                    this.countC++;
                }else if (items[i] == "D" || items[i] == "d"){
                    this.countD++;
                }
            }

        } else {

            this.clearCart();
            document.getElementById("code").value = "";
            this.boxAns.innerText = "Kindly Enter alphabets A,B,C or D";
            this.jBox.style.visibility = "visible";
            this.jBox.className = "orange";
            throw new Error('Kindly Enter alphabets A or B');
            return false;
        }


    },

    clearCart: function () {

        this.countA = this.countB = this.countC = this.countD = this.priceA = this.priceB = this.priceC = this.priceD = 0;
        this.codeInput = "";
        this.jBox.style.visibility = "hidden";


    },

    setTotalPrice: function () {

        if (this.countA < 4) {
            this.priceA = this.countA * 2;
        } else {

            var bunch = 0, extra = 0;
            bunch = Math.floor(this.countA / 4);
            extra = this.countA % 4;
            this.priceA = bunch * 7 + extra * 2;
        }

        this.priceB = this.countB * 12;

        if (this.countC < 6) {
            this.priceC = this.countC * 1.25;
        } else {

            var bunchc = 0, extrac = 0;
            bunchc = Math.floor(this.countC / 6);
            extrac = this.countC % 6;
            this.priceC = bunchc * 6 + extrac * 1.25;
        }

        this.priceD = this.countD * 0.15;
    },

    getTotalPrice: function () {

        this.clearCart();
        this.countItems();

        this.setTotalPrice();

        this.totalPrice = this.priceA + this.priceB + this.priceC + this.priceD;
        this.boxAns.innerText = "The total price of " + this.codeInput + " is $" + this.totalPrice.toFixed(2);
        this.jBox.style.visibility = "visible";
        this.jBox.className = "teal";
        this.inputCode.value = "";
        this.inputCode.blur();
        this.inputCode.focus();

    },

    callXHR: function () {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (xhttp.readyState == 4 && xhttp.status == 200) {

                //this.countItems();
                //this.getTotalPrice();

                this.jBox.innerText = "The total price of " + this.codeInput + " is " + this.totalPrice;
            }
        }
        xhttp.open("POST", "index.php", "true");

    }
}

window.onload = function () {
    POS.init();
}


/**
 * Created by charuverma1 on 10/10/15.
 */
