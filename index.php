<!DOCTYPE html>
<html>
<head>
    <title>JS-AJAX</title>
    <link href='https://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' type='text/css'>
    <style>

        /*dark background to support form theme*/
        body{

            font-family: 'Noto Sans', sans-serif;
        }

        /*site container*/
        .wrapper{
            background-color: #333131;
            width:420px;
            margin: 10% auto;
            padding: 1% 4% 4%;
            border-radius: 8px;
        }

        h1, h2{
            /*font-family: ‘Metrophobic’, Arial, serif;*/
            font-family: 'Noto Sans', sans-serif !important;
            /*font-weight: 400;*/
            text-align:left;
            color:#b2b0b0;
            text-transform:uppercase;
            text-shadow:#000 0px 1px 5px;
            margin-bottom: 5%;
        }

        h2{
            font-size: 14px;
        }

        form{
            width:100%;
        }

        input[type="text"]{
            width:98%;
            padding:15px 0px 15px 8px;
            font-size: 16px;
            border-radius:5px;
            box-shadow:inset 4px 6px 10px -4px rgba(0,0,0,0.3), 0 1px 1px -1px rgba(255,255,255,0.3);
            background-color:white;
            outline:none;
            border:none;
            border:1px solid rgba(0,0,0,1);
            margin-bottom:10px;
            color:#6E6E6E;
            /*text-shadow:#000 0px 1px 5px;*/
        }

        button[name="submit"], button[type="reset"]{
            width:49%;
            padding:15px;
            border-radius:5px;
            outline:none;
            border:none;
            background-color: #1A878F;
            font-size:14px;
            color:#FFF;
            text-transform:uppercase;
            text-shadow:#000 0px 1px 5px;
            border:1px solid #000;
            margin-top: 5%;
        }

        button[type="reset"]{
            background-color: #7c7979;
            margin-left: 1%;
        }
        ::-webkit-input-placeholder {
            color: #4c4a4a;
        }

        :-moz-placeholder { /* Firefox 18- */
            color: #4c4a4a;
        }

        ::-moz-placeholder {  /* Firefox 19+ */
            color: #4c4a4a;
        }

        :-ms-input-placeholder {
            color: #4c4a4a;
        }

        input[type="submit"]:hover{
            opacity:1;
            cursor:pointer;
        }

        .answer-box {
            color: #1A87A7;
            margin: 5% 0;
            background-color: #474545;
            border-radius: 5px;
            padding: 5%;
            border: 2px solid #1A87A7
        }

        #j-box {
            width: 100px;
            visibility: hidden;
            height: 60px;
            background-color: goldenrod;
            margin: 10px 10px 10px 0;
            border-radius: 5px;
            width: 100%;
        }

        #ans {

            padding: 20px 60px;

        }
        .algo {
            font-size: 14px;
            color: teal;
            text-decoration: none;
            text-transform: capitalize;
        }


    </style>
</head>
<body>
<button value="button1"></button>
<div class="wrapper">
    <h1>POS Algorithm</h1>
    <!--<script src="jquery.min.js"></script>-->
    <script src="ajax.js"></script>

    <h2>Enter the product code - <a href="algo-specifications.html" class="algo" target="_blank">See How</a></h2>

    <div id="j-box">
        <div id="ans"></div>
    </div>
    <!--<p>dd</p>-->

    <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>" name="pos">
        <input type="text" id="code" name="product_txt" value=""  placeholder="Enter Product Code" />
        <button id="form-submit" type="button"  name="submit">Submit</button>
        <button id="form-reset" type="reset" value="Reset">Reset</button>
    </form>
</div>
</body>
</html>
