/*!
 * Functions
 */



function get_site_labels(){
	var geturl="xmls/xml_menu.php";
	$.ajax({
		async: false,		
		type: "POST",
		url: geturl,
		timeout: 260000,
		data: {pid:pid,
			   ml:ml,
			   sel:sel
			},
		dataType: "xml",
		success: function(r) {
			var data;
			var s;
			var ret=false;
			var id;
			//s=$(ss).attr('id')*1+1;
			s=ss*1;
			data='<li><select id="'+s+'" name="parent_menu['+s+']" onchange="add_menu(this);">';
			data=data+'<option value="-1">---</option>';
			
			$(r).find('menu').each(function(){
				id=$(this).find("id").text();
				data=data+'<option value="'+id+'"';
				if($(this).find("sel").text()==1){
					data=data+' selected="selected"';
					//pid=id;
					$("#parentID").val(id);
					//parentID=id;
					//alert("2="+parentID);			
				}
				data=data+'>'+$(this).find("name").text()+'</option>';
			});
			
			data=data+'</select></li>';
			$("#menu_tree").append(data);
			//alert("cem1");
			//$(ss).parent().parent().append(data);	
			refresh_menu_priority();
			
		}
		
	});
}






























//ckeditor ve highlight.js ile ilgili.
//Code alanlarinin farkli sekilde gösterilmesini saglamak için kullanilacak. edit-page.pphp sayfasidna açilis disinda da bir çok kere çagirilmasi gerektigi için fonksiyon olarak yaptim.
/* Baslangiç */
function highlight_blocs(){
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}
/* Bitis */


function menu_name_correction(name){
	//alert("change");	
	var cNew = ["&lt;", "&gt;"];
	var cOld = ["<", ">"];
	
	for(i=0;i<cOld.length;i++){	
		name=name.split(cOld[i]).join(cNew[i]);	
		//alert("change2 - i="+i+" deg="+cOld[i]);
		//while(name.indexOf(cOld[i])>0){
			//alert("change3 - i="+i+" deg="+cOld[i]);
			//name = name.replace(cOld[i], cNew[i]);
		//}
		//newname = name.replace(cOld, cNew);
	}
	return name;
}

function html_character_correction(name){
	//alert("change");	
	var cNew = ["&lt;", "&gt;", "&amp;"];
	var cOld = ["<", ">", "&"];
	
	for(i=0;i<cOld.length;i++){	
		name=name.split(cOld[i]).join(cNew[i]);	
		//alert("change2 - i="+i+" deg="+cOld[i]);
		//while(name.indexOf(cOld[i])>0){
			//alert("change3 - i="+i+" deg="+cOld[i]);
			//name = name.replace(cOld[i], cNew[i]);
		//}
		//newname = name.replace(cOld, cNew);
	}
	return name;
}


/* Klavyeden tusa basildiginda isletilecek kod - Baslangiç */
$(document).keyup(function(event){
	var pKey;	//pressed key
	
	if (event.which != null){
		pKey=event.keyCode;
		 //char= String.fromCharCode(event.keyCode);    // old IE
	}
	else if(event.which != null){
		pKey=event.which;
		 //char= String.fromCharCode(event.which);	  // All others
	}
	//alert("keyup "+pKey);
	if (pKey==27){
	//27 = esc tusunun kodu, esc tusuna basildiysa, sayfa üzerinde görünen ekran (n olursa olsun) kapanacak
	//alert("keyup 27="+pKey);
	closeMenuOverDisplay();
	}
});
/* Klavyeden tusa basildiginda isletilecek kod - Bitis */


/* Baslangiç */
/* Sayfanin üzerinde gösterilen menülerin açilmasi ve kapanmasi için kullanilan kod */
var openedOverDisplayMenu;

function openMenuOverDisplay(m){
	closeMenuOverDisplay();
	openedOverDisplayMenu=m;
	if($("#"+openedOverDisplayMenu).hasClass("hide")){
		$("#"+openedOverDisplayMenu).switchClass( "hide", "show", 100 );
	}
}

function closeMenuOverDisplay(){
	if($("#"+openedOverDisplayMenu).hasClass("show")){
		//alert("kapat");
		$("#"+openedOverDisplayMenu).switchClass( "show", "hide", 100 );
	}
}
/* Sayfanin üzerinde gösterilen menülerin açilmasi ve kapanmasi için kullanilan kod  */
/* Bitis */





/* Baslangiç */
/* new-page.php, edit-page.php içinde kullanilan kodlar */

function get_menu_xml(pid ,ml, ss, sel){
	//pid: parent id, seçilen menünün üst menüsünün id degeri
	//ml: menu language
	//ss: Selected select id degeri 0,1,2,3,4,5 diye sirali giden
	//sel: Seçili menüyü gösteriyor. Böylece dil degistirmelerde üstün üstü menülerde seçili olanlar belirlenecek.
	//alert(pid+"-"+ml+"-"+sel);
	var geturl="xmls/xml_menu.php";
	$.ajax({
		async: false,		
		type: "POST",
		url: geturl,
		timeout: 260000,
		data: {pid:pid,
			   ml:ml,
			   sel:sel
			},
		dataType: "xml",
		success: function(r) {
			var data;
			var s;
			var ret=false;
			var id;
			//s=$(ss).attr('id')*1+1;
			s=ss*1;
			data='<li><select id="'+s+'" name="parent_menu['+s+']" onchange="add_menu(this);">';
			data=data+'<option value="-1">---</option>';
			
			$(r).find('menu').each(function(){
				id=$(this).find("id").text();
				data=data+'<option value="'+id+'"';
				if($(this).find("sel").text()==1){
					data=data+' selected="selected"';
					//pid=id;
					$("#parentID").val(id);
					//parentID=id;
					//alert("2="+parentID);			
				}
				data=data+'>'+$(this).find("name").text()+'</option>';
			});
			
			data=data+'</select></li>';
			$("#menu_tree").append(data);
			//alert("cem1");
			//$(ss).parent().parent().append(data);	
			refresh_menu_priority();
			
		}
		
	});
}


function add_menu(ss){
	//ss: Selected select
	//Bu fonksiyon için html kodunun ul, li, select yapisinin bulunmasi gerekiyor.
	var li1;//Seçilen select'in içinde bulundugu li. Select'in id degeri buraya ataniyor
	var li2;//Tek tek li'ler kontrol edilecek. Li içindeki select'in id degeri buraya ataniyor
	li1=$(ss).attr('id');
	
	
	//Seçilenden sonraki select'ler (menüler) siliniyor (li ile birlikte).
	//$(ss).parent().parent().find("li").each(function(){
	$("#menu_tree").find("li").each(function(){
		li2=$(this).children("select").attr('id');
		if(li2>li1){
			//alert("büyük - li1="+li1+" - li2="+li2);
			$(this).remove();
		}
		else{
			//alert("küçük - li1="+li1+" - li2="+li2);
		}
	});
	
	
	//Seçilene göre yeni select (menüler) ekleniyor (li ile birlikte).
	var pid;
	pid=$(ss).val();
	ml=$("#page_language option:selected").val();//1;//Simdilik dil tr olacak. Sonra düzelt.
	//alert("ml="+ml);
	if(pid!=-1){
	//pid sifir ise, select'in en üst degeri olan --- seçilmis demektir. Bu durumda xml ile menü almaya gerek yok.
		//get_menu_xml(pid ,ml, ss);
		//alert(ml);
		get_menu_xml(pid ,ml, li1, 0);
		$("#parentID").val(pid);
	}
	else{
		refresh_menu_priority();
		$("#parentID").val($("#"+(li1-1)).val());
	}

}

//var parentID=0;
//var pid, opid;
//translate-page.php'de kullaniliyor.
//Dil degistirildiginde bütün üst menüler yeniden o dile göre ayarlanacak
function add_menu_all(){
	//ss: Selected select id degeri 0, 1, 2, 3 gibi
	//Bu fonksiyon için html kodunun ul, li, select yapisinin bulunmasi gerekiyor.
	var ul=$("#menu_tree");
	var ml=$("#page_language").val();
	//opid=0;
	//pid=0;
	var opid, pid;
	//var pid, opid;//opid: old parent id
	var r;//xml return
	$(ul).html("");
//	$(ul).find("li").each(function(){
//		$(this).remove();
//	});
	opid=0;
	pid=0;
	//alert(parentID);
	var idList=ids_list.split("|");
	$("#parentID").val("0");
	get_menu_xml(0 ,ml, 0, idList[0]);
	//alert(opid+"|"+parentID);
	//var a=$("#parentID").val();
	//alert("opid="+opid+" | parentid="+$("#parentID").val());
	//alert($("#parentID").val());
	//alert($("#parentID").val());
	//alert($("#parentID").val());
	if($("#parentID").val()!=opid){
		opid=$("#parentID").val();
		for(var i=0;i<idList.length;i++){
			pid=idList[i];
			sel=0;
			if(i<idList.length-1) sel=idList[i+1];
			get_menu_xml(pid, ml, i+1, sel);
			//alert($("#parentID").val());
			if($("#parentID").val()==opid){
				i=idList.length;
				//$("#parentID").val()=opid;
			}
			opid=$("#parentID").val();
			//alert(parentID);
		}
	}
	
	//refresh_parent_id();
	//alert(r);
	//$("#parentID").val("0");
	//pid=$("#parent_menu0 option:selected").val();
	
if(1==2){	
	//alert(ids_list+"="+idList.length);
	//if(pid>0) opid=pid;
	pid=idList[i];
	for(var i=0;i<idList.length;i++){
		//pid=idList[i];
		sel=0;
		if(i<idList.length-1) sel=idList[i+1];
		//alert(pid+"|"+sel);
		get_menu_xml(pid, ml, i+1, sel);
		alert(opid+"|"+pid+"|"+$("#parentID").val());
		pid=$("#parentID").val();
		if(pid>0) opid=pid;
		//sel=0;
		//if(i==idList.length) sel=idList[i+1];
		//pid=$("#"+i+" option:selected").val();
		//pid=$("#menu_tree").find("li").last().find("select option:selected").val();
		//alert(pid+"-"+ml+"-"+(i+1)+"-"+sel);
		//pid=$("#parentID").val();
		//opid=$("#parentID").val();
		//pid=$("#"+i+" option:selected").val();
		
		//alert(opid+"|"+pid+"|"+ml+"|"+i+"|"+sel);
		//alert(pid+"-"+$("#"+i+" option:selected").val());
		//get_menu_xml(idList[$i], ml, i+1, sel);
		//get_menu_xml(pid, ml, i+1, sel);
		//alert("cem2");
		//alert($("#parent_menu"+(i+1)+" option:selected").val());
		//if($("#parent_menu"+(i+1)+" option:selected").val()==-1) i=idList.length;
		
		//$("#parentID").val(idList[$i]);
	}
	refresh_parent_id();

}
	
	if(1==2){
	var li1;//Seçilen select'in içinde bulundugu li. Select'in id degeri buraya ataniyor
	var li2;//Tek tek li'ler kontrol edilecek. Li içindeki select'in id degeri buraya ataniyor
	li1=$(ss).attr('id');
	
	
	//Seçilenden sonraki select'ler (menüler) siliniyor (li ile birlikte).
	$(ss).parent().parent().find("li").each(function(){
		li2=$(this).children("select").attr('id');
		if(li2>li1){
			//alert("büyük - li1="+li1+" - li2="+li2);
			$(this).remove();
		}
		else{
			//alert("küçük - li1="+li1+" - li2="+li2);
		}
	});
	
	
	//Seçilene göre yeni select (menüler) ekleniyor (li ile birlikte).
	var pid;
	pid=$(ss).val();
	ml=$("#menu_language").val();//1;//Simdilik dil tr olacak. Sonra düzelt.
	alert("ml="+ml);
	if(pid!=-1){
	//pid sifir ise, select'in en üst degeri olan --- seçilmis demektir. Bu durumda xml ile menü almaya gerek yok.
		get_menu_xml(pid ,ml, ss);
		//$("#parentID").val(pid);
		refresh_parent_id
	}
	else{
		refresh_menu_priority();
		refresh_parent_id();
		//$("#parentID").val($("#"+(li1-1)).val());
	}
	}

}

function refresh_parent_id(){
	var pid=0;
	$("#menu_tree").find('li').each(function(){
		pid=$(this).find("select").val();
		if(pid>0){
			
		}
	});
	$("#parentID").val(pid);
}

function refresh_menu_priority(){
	//Menü sirasi seçenegi düzenleniyor.
	$('#menu_priority').empty();
	var lsid;	//last select id
	lsid=$("#menu_tree").find("li").last().find("select").attr('id')*1;
	$('#menu_priority').html($("#"+lsid).html());
	$('#menu_priority').val("-1");
}


function change_page_content(s){
	var a;
	addr=$(s).val()
	get_page_layout(addr);
}

function get_page_layout(a){
	var geturl="layouts/pages/"+a+"/new_xml.php";//?pid="+parent_id+"&ml="+dil;
	$.ajax({
		type: "POST",
		url: geturl,
		timeout: 260000,
		dataType: "html",
		success: function(r) {
		$("#wrapper").html(r);
		}
	});
}



function showContentEditor(c){
	cName= $(c).attr("id");
	if($("#"+cName+"Element").hasClass("hide")){
		$("#"+cName).addClass("hide");
		$("#"+cName+"Element").switchClass( "hide", "show", 100 );
	}
	
}

function hideContentEditor(c){
	var cElementName=$(c).parent().attr("id");
	var cName = cElementName.replace("Element", ""); 
	if($("#"+cName+"Element").hasClass("show")){
		$("#"+cName).removeClass("hide");
		$("#"+cName+"Element").switchClass( "show", "hide", 100 );
		var content=eval(cName);
		for(var i in CKEDITOR.instances) {
			if(CKEDITOR.instances[i].name==cName+"Area"){
				var d=CKEDITOR.instances[i].getData(); //d=data
				if(d!=""){
					content=d;
				}
			}
		}		
		$("#"+cName).html(content);
	}
	highlight_blocs();
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


function showKeywordsEditor(c){
	$("#keywords").addClass("hide");
	$("#keywordsElement").switchClass( "hide", "show", 100 );
}

function hideKeywordsEditor(c){
	$("#keywords").switchClass( "hide", "show", 100 );
	$("#keywordsElement").switchClass( "show", "hide", 100 );
	
	$("#keywords").html($("#keywordsArea").val());
}
/* new-page.php, edit-page.php içinde kullanilan kodlar */
/* Bitis */






/* menu-settings.php içinde kullanilan kodlar */
/* Baslangiç */

function xml_get_menu_settings_menu(e,pid ,ml, ss){
	var geturl="xmls/xml_menu3.php";//?pid="+parent_id+"&ml="+dil;
	alert("cem1");
	$.ajax({
		type: "GET",
		url: geturl,
		timeout: 260000,
		data: { pid:pid,
				ml:ml
			},
		dataType: "xml",
		success: function(r) {
		var data;
		var s;
		
		$(r).find('menu').each(function(){
			$("#"+e).append($(this).text());
		});
		
		}
	});
}


//eski
function get_menu3_xml(e,pid ,ml, ss){
	var geturl="xmls/xml_menu3.php";//?pid="+parent_id+"&ml="+dil;
	//alert("cem1");
	$.ajax({
		type: "GET",
		url: geturl,
		timeout: 260000,
		data: { pid:pid,
				ml:ml
			},
		dataType: "xml",
		success: function(r) {
		var data;
		var s;
		//alert(r);
		//s=$(ss).attr('id')*1+1;
	//	data='<li><select id="'+s+'" name="menu['+s+']" onchange="add_menu(this);">';
	//	data=data+'<option value="-1">---</option>';
		
		$(r).find('menu').each(function(){
		//alert($(this).text());
		$("#"+e).append($(this).text());
		//data=data+'<option value="'+$(this).find("id").text()+'">'+$(this).find("name").text()+'</option>';
		});
		
		//data=data+'</select></li>';
		//alert(data+"-"+menu_name_correction(data));
		//$(ss).parent().parent().append(data);	
		//refresh_menu_priority();
		}
	});
}



/* menu-settings.php içinde kullanilan kodlar */
/* Bitis */








/* search.php kullanilan kodlar*/
/* Baslangiç */

/* Bitis */


/* Baslangiç */
/* Bitis */



$(document).ready(function(){






});





/*
*
Kullanilmayan kodlar
*
*/


//Sorunlu fonksiyon



/*$("#menu-icon").click(function(){
if($("#list-menu-div").hasClass("hide")){
	$("#list-menu-div").switchClass( "hide", "show", 100 );
}
else{
	$("#list-menu-div").switchClass( "show", "hide", 100 );
}
});


$("#user-icon").click(function(){
if($("#user-menu-div").hasClass("hide")){
	$("#user-menu-div").switchClass( "hide", "show", 100 );
}
else{
	$("#user-menu-div").switchClass( "show", "hide", 100 );
}
});

$("#edit-icon").click(function(){
if($("#edit-menu-div").hasClass("hide")){
	$("#edit-menu-div").switchClass( "hide", "show", 100 );
}
else{
	$("#edit-menu-div").switchClass( "show", "hide", 100 );
}
});*/
