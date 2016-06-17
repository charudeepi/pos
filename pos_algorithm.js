"use strict";

var POS = POS || {};

POS = {

    countA: 0,
    countB: 0,
    countC: 0,
    countD: 0,
    priceA: 0, // A $2 each or 4 for $7.00
    priceB: 0, // B $12
    priceC: 0, // B $12
    priceD: 0, // B $12

    totalPrice: 0,

    validateC: true,

    codeInput: "",

    init: function () {


        document.getElementById("form-reset").onclick = function () {

            POS.clearCart();
        }

        document.onkeypress = function(){

            if(window.event.keyCode=='13'){
                POS.getTotalPrice();
                return false;
            }

        }

        document.getElementById("form-submit").addEventListener('submit', function(evn){
            evn.preventDefault();
            POS.getTotalPrice();
        },true);

        document.getElementById("form-submit").onclick = function() {
            POS.getTotalPrice();
        }

        document.getElementById('code').focus();


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

                if (items[i] == "A") {
                    this.countA++;
                } else if (items[i] == "B"){
                    this.countB++;
                }else if (items[i] == "C"){
                    this.countC++;
                }else if (items[i] == "D"){
                    this.countD++;
                }
            }

        } else {
            alert('Kindly Enter alphabets A,B,C or D');
            this.clearCart();
            document.getElementById("code").value = "";
            throw new Error('Kindly Enter alphabets A or B');
            return false;
        }


    },

    clearCart: function () {

        this.countA = this.countB = this.countC = this.countD = this.priceA = this.priceB = this.priceC = this.priceD = 0;
        this.codeInput = "";
        document.getElementById("j-box").style.display = "none";


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
        document.getElementById("ans").innerText = "The total price of " + this.codeInput + " is " + this.totalPrice;
        document.getElementById("j-box").style.display = "block";
        document.getElementById("code").value = "";
        document.getElementById('code').blur();
        document.getElementById('code').focus();

    },

    callXHR: function () {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (xhttp.readyState == 4 && xhttp.status == 200) {

                //this.countItems();
                //this.getTotalPrice();

                document.getElementById("j-box").innerText = "The total price of " + this.codeInput + " is " + this.totalPrice;
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