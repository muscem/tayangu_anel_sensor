/*!
 * Fonksiyonlarım
 *
 * Fonksiyon isimlerinde, kelimeler arasında alt çizgi kullan.
 * Bütün harfler küçük olsun. get_storaged_data gibi
 *
 * Değişken isimlerinde kelimeleri birleştir. İlk kelimenin baş harfi küçük,
 * diğerlerinin ki büyük olsun. Diğer harfler küçük olsun.
 * Kısaltmalarda da aynı kelimenin diğer harfleri küçük olsun; cookieNectTId gibi.
 *
 *
 */

$( function() {
});

var xmlDataSendType="POST";//İnternet sitesinde POST, mobil uygulamalarda GET olacak.

//xml bağlantıları gibi gerçek siteyle bağlantılı adreserde kullanılacak.
//var siteUrlAdress="http://localhost/uygulamalar/tayangu/an-el/1";
var siteUrlAdress="http://localhost/works/an-el/count-sensor/server";
//var siteUrlAdress="http://192.168.2.30/works/an-el/count-sensor/server";

//var siteUrlAdress="http://www.tayangu.com.tr/anel";
var xmlsUrl = {
	"getCellsList":"xmls/xml_cells.php",
	"getWorkerList":"xmls/xml_people.php",
	"getControllerList":"xmls/xml_people.php",
	"getWorkOrdersList":"xmls/xml_work_orders.php",
	"getActiveWorkOrderForCell":"xmls/xml_work_orders.php",
	"sendCount":"xmls/xml_count.php",
	"getDepartmentsList":"xmls/xml_departments.php"
}

var xmlsString = {
	"getCellsList":"get-cells-list",
	"getWorkerList":"get-worker-list",
	"getActiveWorkOrderForCell":"get-active-work-order-for-cell",
	"getControllerList":"get-controller-list",
	"getWorkOrdersList":"get-work-orders-list",
	"sendCount":"send-count",
	"getDepartmentsList":"get-departments-list"
}


var sData={//Kaydedilen verilerin adları. Mesela kullanıcı adı ur ismiyle kaydedilecek
	"workNo":"workNo",
	"cellName":"cellName",
	"cellID":"cellID",
	"serverIP":"serverIP",
	"departmentID":"departmentID",
	"departmentName":"departmentName"
}




/* Baslangiç - Çerez islemleri ile ilgili */
var storagedData = window.localStorage;
//var value = storagedData.getItem(key); // Pass a key name to get its value.
//storagedData.setItem(key, value) // Pass a key name and its value to add or update that key.
//storagedData.removeItem(key) // Pass a key name to remove that key from storage.


//Belirli bir değeri silen kod.
function delete_storaged_data(sName){
	storagedData.removeItem(sName)
}

function delete_storaged_all_data(){
	storagedData.clear();
}
//Belirli bir degeri ögrenen kod
function get_storaged_data(sName){
	return storagedData.getItem(sName);
}
function show_storaged_data(){
	var d;
	d="";
	for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
	if (d!="") d+="\n";
    d=d+key + " => " + value;
	}
}

function set_storaged_data(sName, sValue){
	storagedData.setItem(sName, sValue)
}

/* Bitis - Çerez islemleri ile ilgili */

function redirect_page(u){
	window.location.replace(u);
}

function get_departments_list(){
	//alert(siteUrlAdress+"/"+xmlsUrl.getCellsList);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getDepartmentsList,
		timeout: 260000,
		data: {/*un:userPref.uName,
				p:userPref.uPassword,*/
				s:xmlsString.getDepartmentsList
			},
		dataType: "xml"
	})
	.done(function(r){
		//alert("cem");
		$("#department-name").empty();
		var data;
		$("#department-name").append('<option value="0">---</option>');
		$(r).find('result').each(function(index, element) {
			data='<option value="'+$(this).find('id').text()+'">'+$(this).find('name').text()+'</option>';
			
			$("#department-name").append(data);
			
        });
		
		if(get_storaged_data(sData.departmentID)>0){
			$("#department-name").val(get_storaged_data(sData.departmentID)).attr("selected", true);
			get_cells_list(get_storaged_data(sData.departmentID));
		}
	
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		//alert(messages[userPref.lang][2]);
	});
	//stop_search();
}

function get_cells_list(d){
	//alert(siteUrlAdress+"/"+xmlsUrl.getCellsList);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getCellsList,
		timeout: 260000,
		data: {/*un:userPref.uName,
				p:userPref.uPassword,*/
				s:xmlsString.getCellsList,
				d:d
			},
		dataType: "xml"
	})
	.done(function(r){
		//alert("cem");
		$("#cell-name").empty();
		var data;
		$("#cell-name").append('<option value="0">---</option>');
		$(r).find('result').each(function(index, element) {
			data='<option value="'+$(this).find('id').text()+'">'+$(this).find('name').text()+'</option>';
			
			$("#cell-name").append(data);
			
        });
		
		if(get_storaged_data(sData.cellName)!=""){
			//alert(get_storaged_data(sData.cellID));
			$("#cell-name").val(get_storaged_data(sData.cellID)).attr("selected", true);
			//get_work_orders_list();
		}
	
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		//alert(messages[userPref.lang][2]);
	});
	//stop_search();
}

function get_work_orders_list(){
	var cell=$("#cell-name").val()
	
	if(cell>0){
	set_storaged_data("cellId", cell);		
	set_storaged_data("cellName", $("#cell-name :selected").text());
	var dt= new Date();
	var y=dt.getFullYear();
	var m=dt.getMonth()+1;
	var d=dt.getDay();	
	
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.getWorkOrdersList,
			timeout: 260000,
			data: {/*un:userPref.uName,
					p:userPref.uPassword,*/
					s:xmlsString.getWorkOrdersList,
					c:cell,
					y:y,
					m:m,
					d:d
				},
			dataType: "xml"
		})
		.done(function(r){
			$("#work-order").empty();
			var data;
			$("#work-order").append('<option value="0">---</option>');
			$(r).find('result').each(function(index, element) {
				data='<option value="'+$(this).find('id').text()+'">'+$(this).find('name').text()+'</option>';
				$("#work-order").append(data);
			});
			
			if(get_storaged_data("workOrderName")!=""){
				//$("#cell-name").val(get_storaged_data("cellId")).attr("selected", true);
				$("#work-order").val(get_storaged_data("workOrderId")).attr("selected", true);
			}
			
		})
		.fail(function(){
			//if(pages.login!=find_page_name()) open_page(pages.login,"");
			//alert(messages[userPref.lang][2]);
		});
	}
}

function add_worker(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getWorkerList,
		timeout: 260000,
		data: {/*un:userPref.uName,
				p:userPref.uPassword,*/
				s:xmlsString.getWorkerList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, surname, working, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="worker[]" class="left margin-left-5 form-element-1">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
        });
		data+='</select>';
		data+='<div class="margin-left-3">';
		data+='<img class="info-part-logo" src="images/minus-red.png" onclick="delete_worker(this);" />';
		data+='</div>';
		data+='</div>';
		$("#worker-list").append(data);
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		//alert(messages[userPref.lang][2]);
	});
	stop_search();
}

function delete_worker(e){
	$(e).parent().parent().remove();
	stop_search();
}

function add_controller(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getControllerList,
		timeout: 260000,
		data: {/*un:userPref.uName,
				p:userPref.uPassword,*/
				s:xmlsString.getControllerList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, surname, working, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="controller[]" class="left margin-left-5 form-element-1">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
        });
		data+='</select>';
		data+='<div class="icon-container-l-2 margin-left-3">';
		data+='<img class="info-part-logo" src="images/minus-red.png" onclick="delete_worker(this);" />';
		data+='</div>';
		data+='</div>';
		$("#controller-list").append(data);
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		//alert(messages[userPref.lang][2]);
	});
	stop_search();
}

function delete_controller(e){
	$(e).parent().parent().remove();
	stop_search();
}

function set_work_order(){
	set_storaged_data("workOrderName", $("#work-order :selected").text());		
	set_storaged_data("workOrderId", $("#work-order :selected").val());
}



































function get_active_work_order_for_cell(){
	if(get_storaged_data(sData.cellID)>0){
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.getActiveWorkOrderForCell,
			timeout: 260000,
			data: {/*un:userPref.uName,
					p:userPref.uPassword,*/
					s:xmlsString.getActiveWorkOrderForCell,
					/*y:y,
					m:m,
					d:d*/
					c:get_storaged_data(sData.cellID)
				},
			dataType: "xml"
		})
		.done(function(r){
			$(r).find('result').each(function(index, element) {
				$("#work-no-label").html($(this).find('name').text());
				$("#count-label").html($(this).find('count').text());
			});
		})
		.fail(function(){
			//if(pages.login!=find_page_name()) open_page(pages.login,"");
			//alert(messages[userPref.lang][2]);
		});
	}
}




// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//
function onDeviceReady() {
	// Now safe to use the PhoneGap API
	//alert("Device is ready");
	//$.support.cors=true;

	
	//xmlDataSendType="GET";
	document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
	document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
}

function onVolumeDownKeyDown() {
    // Handle the volume down button
	$("#count-label").html($("#count-label").html()*1-1);
}

function onVolumeUpKeyDown() {
    // Handle the volume up button
	$("#count-label").html($("#count-label").html()*1+1);
}

function send_count_to_server(){
	var c=$("#count-label").html();
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.sendCount,
		timeout: 260000,
		data: {/*un:userPref.uName,
				p:userPref.uPassword,*/
				s:xmlsString.getCellsList,
				c:c
			},
		dataType: "xml"
	})
	.done(function(r){
	
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		//alert(messages[userPref.lang][2]);
	});
}








var pageNo;

var xmlDataSendAddressAdd="";
//var xmlDataSendAddressAdd="mobile/";



var messages = {
	"tr" : {
		"0" : "Kullanıcı adını ve şifreyi kontrol edip tekrar deneyin lütfen!",
		"1" : "Sunucuyla ilgili bir sorun olustu. Lütfen sonra tekrar deneyin!",
		"2" : "Sunucuyla ilgili bir sorun olustu. Lütfen sonra tekrar deneyin!",
		"3" : "Ad ve soyad kısımlarını doldurun lütfen!",
		"4" : "Bu kişi kayıtlı zaten!",
		"5" : "İsteğiniz yerine getirilemedi. Daha sonra tekrar deyin. Sorun devam ederse yöneticiye bildirin lütfen!"
	},
	"en" : {
		"0" : "Please check username and password then try again!",
		"1" : "There is a server problem. Please try again later.",
		"2" : "There is a server problem. Please try again later.",
		"3" : "Please, fill the name and surname boxes!",
		"4" : "This person is already saved!",
		"5" : "This jub is not completed. Try again later. If problem will continue, report to administrator please!"
	}
}




var userPref={
	"uName":"",
	"uPassword":"",
	"uRemember":"",
	"lang":"en"
}


var pages={
	"login":"page1.html",
	"main":"page3.html",
	"settings":"page4.html",
	"settingLanguage":"page2.html"
}


var elementsName={
	"userName":"username",
	"userPassword":"password",
	"userRememeber":"remember",
	"userLanguage":"user-language",
	"peopleList":"people-list",
	"departmentList":"department-list",
	"morningNotesList":"morning-notes-list",
	"searchMorningNotesList":"search-morning-notes-list",
	"morningNote":"morning-note",
	"morningNoteContent":"morning-note-content",
	"favoriteMorningNotesList":"favorite-morning-notes-list",
	"morningNotesStatistics":"morning-notes-statistics"
}





/*var xmlsUrl = {
	"userLoginControl":"xmls/xml_login_control.php",
	"getPeopleList":"xmls/xml_people_list.php",
	"getDepartmentList":"xmls/xml_department_list.php",
	"getMorningNotesList":"xmls/xml_morning_notes.php",
	"submitNewMorningNote":"xmls/xml_morning_notes.php",
	"getMorningNote":"xmls/xml_morning_notes.php",
	"submitEditMorningNote":"xmls/xml_morning_notes.php",
	"searchMorningNote":"xmls/xml_morning_notes.php",
	"searchAdvancedMorningNote":"xmls/xml_morning_notes.php",
	"getMorningNoteToShow":"xmls/xml_morning_notes.php"
}*/
/*var xmlsUrl = {
	"userLoginControl":"xmls/mobile/xml_login_control.php",
	"getPeopleList":"xmls/mobile/xml_people_list.php",
	"getDepartmentList":"xmls/mobile/xml_department_list.php",
	"getMorningNotesList":"xmls/mobile/xml_morning_notes.php",
	"submitNewMorningNote":"xmls/mobile/xml_morning_notes.php",
	"getMorningNote":"xmls/mobile/xml_morning_notes.php",
	"submitEditMorningNote":"xmls/mobile/xml_morning_notes.php",
	"searchMorningNote":"xmls/mobile/xml_morning_notes.php",
	"searchAdvancedMorningNote":"xmls/mobile/xml_morning_notes.php",
	"getMorningNoteToShow":"xmls/mobile/xml_morning_notes.php"
}*/







/*function show_dev(){
	var d;
	//alert("4");
	d="$(window).height()="+$(window).height()+"<br>";
	//data="$(window).height()="+$(window).height()+"<br>";
	//alert("5");
	d+="$(document).height()="+$(document).height()+"<br>";
	//data+="$(document).height()="+$(document).height()+"<br>";
	//alert("6");
	d+="$(window).width()="+$(window).width()+"<br>";
	//data+="$(window).width()="+$(window).width()+"<br>";
	//alert("7");
	d+="$(document).width()="+$(document).width()+"<br>";
	//data+="$(document).width()="+$(document).width()+"<br>";
	//alert("8");
	alert(d);
	$("#test").html(d);
}*/

function startAllPagesWithThis(){
	find_page_number();
	//alert("cem1");
	get_user_prefs();
	//alert("cem2");
	user_control();
	//alert("cem3");
	write_new_language_on_page();
	//alert("cem4");
	if($("#wrapper").hasClass("hide")){
		$("#wrapper").removeClass("hide");
		$("#background-logo").css("background","url(images/background-logo.jpg) no-repeat top center");
	}
	on_start_this_page();
}

function on_start(){
	//alert("cem1");
/*	show_storaged_data();*/

	startAllPagesWithThis();
	
	
/*
	find_page_number();
	get_user_prefs();
	user_control();
	write_new_language_on_page();
	on_start_this_page();//Her sayfanın kendi başlangıç kodunun olduğu kod
	
*/	
	
/*	var data;
	data="$(window).height()="+$(window).height()+"<br>";
	data+="$(document).height()="+$(document).height()+"<br>";
	data+="$(window).width()="+$(window).width()+"<br>";
	data+="$(document).width()="+$(document).width()+"<br>";
	
	$("#test").html(data);*/
}



function get_user_prefs(){
	
	
	if(get_storaged_data(sData.userRemember)!="" && get_storaged_data(sData.userRemember)!=null) userPref.uRemember=get_storaged_data(sData.userRemember);
	if(userPref.uRemember!=""){
		var uRDate1 = new Date();
		var uRDate2 = new Date(userPref.uRemember);
		if(uRDate2-uRDate1>0){
			if(get_storaged_data(sData.userName)!="" && get_storaged_data(sData.userName)!=null) userPref.uName=get_storaged_data(sData.userName);
			if(get_storaged_data(sData.userPassword)!="" && get_storaged_data(sData.userPassword)!=null) userPref.uPassword=get_storaged_data(sData.userPassword);
			
		}
	}
	
	if(get_storaged_data(sData.userLanguage)!="" && get_storaged_data(sData.userLanguage)!=null) userPref.lang=get_storaged_data(sData.userLanguage);
	
	//alert(get_storaged_data(sData.userLanguage));
	
	
	//alert(userPref.uName+"-"+userPref.uPassword+"-"+userPref.uRemember+"-"+userPref.lang+"\n"+get_storaged_data(sData.userName)+"-"+get_storaged_data(sData.userPassword)+"-"+get_storaged_data(sData.userRemember)+"-"+get_storaged_data(sData.userLanguage));
}





function find_page_name(){
	var p=window.location.pathname.split("/");
	return p[p.length-1];
}
function find_page_number(){
	var p=window.location.pathname.split("/");
	var pNo=p[p.length-1];
	pNo=pNo.replace("page","");
	pNo=pNo.replace(".html","");
	pageNo=pNo;
}

function open_page(p, no){
	//Açılacak sayfa (page)
	//Açılacak sayfaya gönderilecek değer. Bir tür form veya get ile bilgi göndermek gibi
	var root=p.split("/");
	var backUrl=find_page_name();
//	for(var i=1; i<root.length;i++){
//		backUrl="../"+backUrl;
//	}
	
	
	//set_storaged_data("back"+p, find_page_name(), "y");
	set_storaged_data("back"+p, backUrl);
	if(no!="") set_storaged_data(p, no);
	redirect_page(p);
}


//Kullanılmıyor
function open_back_page(){
	
//	var page=window.location.pathname.split("/");
//	var newUrl="";
//	for(var i=0;i<page.length;i++){
//		if(newUrl!="") newUrl=newUrl+"/";
//		newUrl=newUrl+page[i];
//	}
//	alert("cem");
	
	var p;
	p=get_storaged_data("back"+find_page_name());
	redirect_page(p);
//	alert(window.location.pathname+"-"+find_page_name());
	//set_storaged_data("back"+p, backUrl);
}










//Dil değişimi yapıldığında sayfa üzerindeki yazıların hepsinin dilini değiştiren kod
function write_new_language_on_page(){
	//alert("cem p1-"+userPref.lang);
	write_labels_on_page();
	//alert("cem p2");
	write_titles_on_page();
	//alert("cem p3");
	write_alts_on_page();
	//alert("cem p4");
	write_options_on_page();
}


function write_labels_on_page(){
	if(pageNo in labels){
		for(var i=0;i<Object.keys(labels[pageNo][userPref.lang]).length;i++){
			if($(".label-"+i).prop("tagName")=="INPUT"){
				if($(".label-"+i).attr("type")=="button"){
					$(".label-"+i).val(labels[pageNo][userPref.lang][i]);
				}
			}
			else if($(".label-"+i).prop("tagName")=="SPAN"){
				$(".label-"+i).html(labels[pageNo][userPref.lang][i]);
			}
			else if($(".label-"+i).prop("tagName")=="DIV"){
				$(".label-"+i).html(labels[pageNo][userPref.lang][i]);
			}
		}
	}
}



function write_titles_on_page(){
	if(pageNo in titles){
		for(var i=0;i<Object.keys(titles[pageNo][userPref.lang]).length;i++){
			$(".title-"+i).attr("title", titles[pageNo][userPref.lang][i]);
		}
	}
}


function write_alts_on_page(){
	if(pageNo in alts){
		for(var i=0;i<Object.keys(alts[pageNo][userPref.lang]).length;i++){
			$(".alt-"+i).attr("alt", alts[pageNo][userPref.lang][i]);
		}
	}
}

function write_options_on_page(){
	if(pageNo in selectOptions){
		for(var i=0;i<Object.keys(selectOptions[pageNo][userPref.lang]).length;i++){
			for(var j=0;j<Object.keys(selectOptions[pageNo][userPref.lang][i]).length;j++){
				$(".sOption-"+i+" option[value='"+j+"']").text(selectOptions[pageNo][userPref.lang][i][j]);
			}
		}
	}
}



function change_language(){
	var lang=$("#"+elementsName.userLanguage).val();
	set_storaged_data(sData.userLanguage, lang);
	userPref.lang = lang;
	write_labels_on_page();
	write_titles_on_page();
	write_alts_on_page();
}









function user_logout(){
	set_storaged_data(sData.userName, "");
	set_storaged_data(sData.userPassword, "");
	set_storaged_data(sData.userRemember, "");
	open_page(pages.login, "");
}


//Sadece login sayfasında kullanılacak
function user_login(){	
	//alert("user_login"+"\n"+siteUrlAdress+"/"+xmlsUrl.userLoginControl+"\n pref Uname="+userPref.uName+"\n pref pass="+userPref.uPassword);
	var uName=$("#"+elementsName.userName).val();
	var uPassword=$("#"+elementsName.userPassword).val();
	var uRemember=$("#"+elementsName.userRememeber).is(":checked");
	if($("#"+elementsName.userRememeber).is(":checked")){
		var uRDate1 = new Date();
		var uRDate2 = new Date(uRDate1.getTime()+(100*366*24*60*60*1000));//Yüz yıl
		uRemember=uRDate2;
	}
	else{
		var uRDate1 = new Date();
		var uRDate2 = new Date(uRDate1.getTime()+(24*60*60*1000));//Bir gün
		uRemember=uRDate2;
	}
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.userLoginControl,
		timeout: 260000,
		data: {un:uName,
				p:uPassword,
				s:xmlsString.userLoginControl
			},
		dataType: "xml"
	})
	.done(function(r){
		var uc = $(r).find('result').text();
		//alert("user_login"+"\n uc="+uc+"\n name="+uName+"\n pass="+uPassword)
		if(uc==1){
			set_storaged_data(sData.userName, uName);
			set_storaged_data(sData.userPassword, uPassword);
			set_storaged_data(sData.userRemember, uRemember);
			if(pages.login==find_page_name()) open_page(pages.main,"");
		}
		else{
			alert(messages[userPref.lang][0]);
		}
	})
	.fail(function(){
		alert(messages[userPref.lang][1]);
	});
}


//Her sayfanın başında kullanılacak
function user_control(){	
	//alert("user_control"+"\n"+siteUrlAdress+"/"+xmlsUrl.userLoginControl+"\n pref Uname="+userPref.uName+"\n pref pass="+userPref.uPassword);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.userLoginControl,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.userLoginControl
			},
		dataType: "xml"
	})
	.done(function(r){
		var uc = $(r).find('result').text();
		//alert("user_control"+"\n uc="+uc+"\n pref Uname="+userPref.uName+"\n pref pass="+userPref.uPassword);
		if(uc==1){
			var uRDate1 = new Date();
			var uRDate2 = new Date(userPref.uRemember);
			if(userPref.uRemember=="" || uRDate2-uRDate1<(24*60*60*1000)){//Bir gün
				var uRDate3 = new Date(uRDate1.getTime()+(24*60*60*1000));//Bir gün
				userPref.uRemember=uRDate3;
				set_storaged_data(sData.userRemember, userPref.uRemember);
			}
			else if(uRDate2-uRDate1>(24*60*60*1000)){//Bir gün
				var uRDate4 = new Date(uRDate1.getTime()+(100*366*24*60*60*1000));//Yüz yıl
				userPref.uRemember=uRDate4;
				set_storaged_data(sData.userRemember, userPref.uRemember);
			}
			//set_storaged_data(sData.userName, userPref.uName);
			//set_storaged_data(sData.userPassword, userPref.uPassword);
			//set_storaged_data(sData.userRemember, userPref.uRemember);
			if(pages.login==find_page_name()) open_page(pages.main,"");
		}
		else{
			if(pages.login!=find_page_name() && pages.settingLanguage!=find_page_name()) open_page(pages.login,"");
			//alert("Kullanıcı adını ve şifreyi kontrol edip tekrar deneyin lütfen!");
		}
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
}


document.addEventListener("deviceready", onDeviceReady, false);