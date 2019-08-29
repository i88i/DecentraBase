$(document).ready(function() {

var queryingWurst = browser.tabs.query({currentWindow: true, active: true, url: ["*://*.ebay.com/itm/*", "*://*.ebay.de/itm/*", "*://*.ebay.ca/itm/*"]});
// console.log(queryingWurst);
 queryingWurst.then(WurstTabs, onError);
 
function WurstTabs(tabs) {
       
  for (let tab of tabs) {
  // var ebayItemNr = tab.url.slice(tab.url.indexOf("/", 25), tab.url.indexOf("?", tab.url.indexOf("/", 25) ));
  
  pos1 = tab.url.indexOf("/", 25) + 1;
  pos2 = tab.url.indexOf("?", pos1);
  ebayItemNr = tab.url.slice(pos1, pos2);

  var WurstURL = ebayItemNr;
   WurstTitle = tab.title.slice(0, -4) + ebayItemNr;
   
 //  console.log(WurstTitle);
      
//  console.log(localStorage.getItem('WurstTitleKey')); 
  
   if (localStorage.getItem('WurstTitleKey') !== WurstTitle) {
     Swal({title: 'Where\'re you heading to...?', text: '(Be sure to be on the item page you\'re commenting on)', confirmButtonText: 'You\' got it!'});
     };    
 //     console.log(WurstTitle);
  localStorage.setItem('WurstTitleKey', WurstTitle); 
 // console.log(localStorage.getItem('WurstTitleKey'));
 
  var legendHead = WurstTitle;
  var headline = document.getElementById('wurstTitle');
  headline.insertAdjacentHTML('afterbegin', '<legend><h3><u style="color:darkred">'+legendHead+'</u></h3></legend>');
  document.getElementById('form-normal').style.display = 'block';
  document.getElementById('wuschTitle').value = WurstTitle;    
  document.getElementById('wurstURL').value = WurstURL;
  
  }
}
});

$("#credsbutton").click(function(){
        $("#credentials").toggle();
    });

$(".password-showhide .show-password").click(function() {
    $("#keyfield").attr("type", "text");
    $(".password-showhide .show-password").hide();
    $(".password-showhide .hide-password").show();
});
$(".password-showhide .hide-password").click(function() {
    $("#keyfield").attr("type", "password");
    $(".password-showhide .hide-password").hide();
    $(".password-showhide .show-password").show();
});

var maxLength = 2000;
$('#comment').on('change keyup paste mousemove click', function() {
  var length = $(this).val().length;
  var length = maxLength-length;
  $('#chars').text(length);
});

 $('.phoenix-ebus').phoenix({
	webStorage: "localStorage",
    maxItems: 10,
    saveInterval: 3000,
    clearOnSubmit: false,
    saveOnChange: true,
    keyAttributes: ["tagName", "id", "name"]
    }); 


$("#commentErase").click(function(){
    $("#comment").val('');
 //   $("#username").val('');
    $('#chars').text(maxLength + " characters left");  // This resets character counter above
});

$('#submit').click(function(e) {
    var username = $('#username').val();
    if (!(username.length >= 3 && username.length <= 20) || username.length == 0) {
        $('#p2').text("* <==Username! *");
    $('#username').focus();
    return false
        }  
});

function onError(error) {
  console.log(`Error: ${error}`);
}




/// AJAX FOR FORM SUBMISSION:
$(document).ready(function() {

$('form').submit(function(event) {

 Ajax();

event.preventDefault();
});

  })

function Ajax() {
		var senf = [];
    
            var username = "";
			var usernumber = "0";
			var keyfield = "";
	        var wuschTitle = "";
            var wurstURL = "";
			var comment = "";
    
	        username = ($("#username").val());
			usernumber = ($("#usernumber").val());
			keyfield = ($("#keyfield").val());
	        wuschTitle = ($("#wuschTitle").val());
            wurstURL = ($("#wurstURL").val());
			comment = ($("#comment").val());
	        
	        
			
							senf[0] = username;							
							senf[1] = usernumber;
							senf[2] = keyfield;
							senf[3] = wuschTitle;
                            senf[4] = wurstURL;
							senf[5] = comment;
       console.log(username);               		
 
		doAjax();					


	function doAjax() {
		
		
		var array, ajax;
					
	    array = JSON.stringify(senf);
		  
	
		//object = JSON.stringify({first: 'obj_item1', second: 'obj_item2', third: 'obj_item3'});
		//			
		////Pass the values to the AJAX request and specify function arg for 'done' callback
		ajax = theAjax(array);
		ajax.done(processTakeURLData);
		ajax.fail(function( jqXHR, textStatus, errorThrown) {
				//Output error information
		});
    }
function theAjax(arr) {
	return $.ajax({
    //  url: 'localhost/URLpicker/spinlister1.php',
      url: 'https://checkabid.com/Senf/ebaylister1.php',
 //  contentType: 'application/json',
 //  dataType: 'json',
    processTakeURLData: false,
	 data: arr,
// data: JSON.stringify(urls),
//    data: { js_array: arr },
	  type: "POST",
	  cache: false,
      error: function(xhr, desc, err) {
    },
	  success: function(msg) {
   console.log("got it done!");
	  }
    }); // end $.ajax return call
}         // end of theAjax
}   // end of Ajax()

 // This takes care of data once returned from Server:
	function processTakeURLData(returnedstuff /*}textStatus, jqXHR*/) {
// console.log(returnedstuff);
//	var response = returnedstuff;
var response = JSON.parse(returnedstuff);
//	console.log("this here is the JSONparsed response:");
// console.log(response);     
badWurst = response.badWurst;
// badSenf = response.badSenf;
badFormfield = response.badFormfield;
mailSent = response.mailSent;
enterNewTopic = response.enterNewTopic;
enterNewPost = response.enterNewPost;
topicID = response.topicID;                                     //  Wird zum senfURL gebraucht
badCredentials = response.badCredentials;
postNumber = response.postNumber;

if (badWurst === true) {Swal("The eBay item URL wasn't accepted by the server!\nPlease check the page you're submitting this off of! Then try again!")}
// if (badSenf === true) {alert("Die URL-Addresse des Senfes wurde vom Server nicht akzeptiert!\nBitte korrigieren Sie und dann versuchen Sie's nochmal!")}

if (badFormfield === true) { Swal({
  title: '<strong>A form field wasn\'t filled out correctly!</strong>',
  // type: 'error',
  text: 'One of your form fields has an incorrect number of- (or kind of) characters, e.g. a period or a colon etc.. Please check and correct! Then try again!',
  focusConfirm: true,
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> I\'ll do that!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
})   }        

if (mailSent === true) { Swal({
  // type: 'success',
  title: 'e-Mail has been sent!',
  text: 'We have sent you an eMail with your credentials. Please check your inbox. If it\'s not there it may be in the Spam directory?',
  focusConfirm: true,
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cool! Can\'t wait to use this!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
})   }        

if (enterNewTopic === true) { Swal({
  title: '<strong>Your entry has been added to this item!</strong>',
  // type: 'success',
  html: '<a href="http://altcon.altconsys.com/t/-/'+topicID+'">Click here to follow up or discuss this further</a>',
  focusConfirm: true,
  confirmButtonText: '<i class="fa fa-thumbs-up"></i>Cool, I love it!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
})   }

if (enterNewPost === true) { Swal({
  title: '<strong>Your entry has been addedd to this item!</strong>',
  // type: 'success',
  html: '<a href="http://altcon.altconsys.com/t/-/'+topicID+'">Click here to follow up or discuss this further</a><br>' + 'Posts: <b>'+postNumber+'</b>',
  focusConfirm: true,
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cool, I love it!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
})   }

if (badCredentials === true) { Swal({
  title: '<strong>Wrong Credentials?<br> Limitations violated?</strong>',
  // type: 'error',
  text: 'Your access credentials are wrong and/or you have violated one or more limitations. Please check and correct! Then try again!',
  focusConfirm: true,
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> I\'ll do that!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
})   }


}

