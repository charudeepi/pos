<?php
/**
 * Created by PhpStorm.
 * User: charuverma1
 * Date: 9/23/15
 * Time: 6:14 PM
 */


class PointOfSaleTerminal
{
    var $numA;
    var $numB;
    var $numC;
    var $numD;
    var $priceA;
    var $priceB;
    var $priceC;
    var $priceD;
    var $priceCode;

    function resetPriceCode(){
        $this->numA = 0;
        $this->numB = 0;
        $this->numC = 0;
        $this->numD = 0;
        $this->priceA = 0;
        $this->priceB = 0;
        $this->priceC = 0;
        $this->priceD = 0;
    }

    function setPricing($priceCode){
        $this->resetPriceCode(); // reset price to 0
        $this->priceCode = $priceCode;
        $j = mb_strlen($this->priceCode);
        for ($k = 0; $k < $j; $k++) {
            // do stuff with character
            $character = mb_substr($this->priceCode, $k, 1);
            if($character == 'A'){
                $this->numA = $this->numA + 1;
            }else if($character == 'B'){
                $this->numB = $this->numB + 1;
            }else if($character == 'C'){
                $this->numC = $this->numC + 1;
            }else if($character == 'D'){
                $this->numD = $this->numD + 1;
            }
        }
        $this->scan('A'); // Scan code A
        $this->scan('B'); // Scan code B
        $this->scan('C'); // Scan code C
        $this->scan('D'); // Scan code D
    }

    function scan($character){
        switch($character){
            case 'A' : // A $2 each or 4 for $7.00
                if($this->numA < 4){
                    $this->priceA = 2 * $this->numA;
                }else{
                    $packs = round($this->numA / 4);
                    $remaining_items = $this->numA - ($packs * 4);
                    $this->priceA = ($packs * 7) + ($remaining_items * 2);
                }
                break;
            case 'B' : // B $12
                $this->priceB = 12 * $this->numB;
                break;
            case 'C' : // C $1.25 or $6 for a six pack
                if($this->numC < 6){
                    $this->priceC = 1.25 * $this->numC;
                }else{
                    $packs = round($this->numC / 6);
                    $remaining_items = $this->numC - ($packs * 6);
                    $this->priceC = ($packs * 6) + ($remaining_items * 1.25);
                }
                break;
            case 'D' : // D $0.15
                $this->priceD = 0.15 * $this->numD;
                break;
            default:
                break;
        } // end switch
    }

    function calculateTotal(){
        return $this->priceA + $this->priceB + $this->priceC + $this->priceD;
    }
}

// New Object
$terminal = new PointOfSaleTerminal;

echo "<br>Scan these items in this order: ABCDABA; Verify the total price is ";
$terminal->setPricing('ABCDABACA');
$result = $terminal->calculateTotal();
echo '$'.number_format($result, 2, '.', ',');

echo "<br>Scan these items in this order: CCCCCCC; Verify the total price is ";
$terminal->setPricing('CCCCCCCd');
$result = $terminal->calculateTotal();
echo '$'.number_format($result, 2, '.', ',');

echo "<br>Scan these items in this order: ABCD; Verify the total price is ";
$terminal->setPricing('ABCD');
$result = $terminal->calculateTotal();
echo '$'.number_format($result, 2, '.', ',');


?>