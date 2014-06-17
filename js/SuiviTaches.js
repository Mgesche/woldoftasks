var iLog = 0;
var idCurrentDemande;
var db;

$('document').ready(new function() {

	lancement("Document ready {");

	db = initDB();
	
	setCurrentDemande(0);

	SQL_RefreshListDemandes();
//	SQL_RefreshListDemandesClassificationPhase();
//	SQL_RefreshListDemandesClassificationTechno();
//	SQL_RefreshListDemandesClassificationAction();
	
	//SQL_ClearPhaseProjet();
	//SQL_SamplePhaseProjet();
	SQL_RefreshListPhaseProjet();
	
	//SQL_ClearTechno();
	//SQL_SampleTechno();
	SQL_RefreshListTechno();
	
	//SQL_ClearAction();
	//SQL_SampleAction();
	SQL_RefreshListAction();
	
	cloture("}");
	
	$('#newDemande').keyup(function(e) {
	   if(e.keyCode == 13) { // KeyCode de la touche entrée
			  alert("Hey ! Tu as appuyé sur la touche entrée !!"); 
	 }
	});
	

});

$(document).on("pagebeforeshow", "#PageDemande", function() {
	console.log("#PageDemande:pagebeforeshow")
	endClassification();
});

$(document).on("pagebeforeshow", "#PageClassificationPhase", function() {
	console.log("#PageClassificationPhase:pagebeforeshow")
	if(isClassificationInProgress() == "1") {
	} else {
		beginClassification();
		SQL_RefreshListDemandesClassification();
	}
});

$(document).on("pagebeforeshow", "#PageClassificationTechno", function() {
	console.log("#PageClassificationTechno:pagebeforeshow")
	//SQL_RefreshListDemandesClassificationTechno();
	//SQL_RefreshListTechno();
});

$(document).on("pagebeforeshow", "#PageClassificationAction", function() {
	console.log("#PageClassificationAction:pagebeforeshow")
	//SQL_RefreshListDemandesClassificationAction();
	//SQL_RefreshListAction();
});

function goToPage(page) {
	$.mobile.changePage('#'+page);
}

function initDB(){

	lancement("initDB {");

	/* Création de la DB */
	var db = openDatabase ("SuiviTache", "1.0", "Test", 65535);
	/* Creation of the table */
//	db.transaction(function(transaction){
	
		/* F_Demande */
/*		var sql =	"CREATE TABLE IF NOT EXISTS F_demande (" +
						"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
						"title VARCHAR(100) NOT NULL,"+
						"description VARCHAR(500) NULL,"+
						"dt_meta_cre integer,"+
						"dt_meta_maj integer,"+
						"dt_meta_del integer"+
					")";
		transaction.executeSql(sql);*/
		
		/* D_Phase_Projet */
/*		var sql =	"CREATE TABLE IF NOT EXISTS D_Phase_Projet (" +
						"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
						"title VARCHAR(100) NOT NULL,"+
						"description VARCHAR(500) NULL,"+
						"dt_meta_cre integer,"+
						"dt_meta_maj integer,"+
						"dt_meta_del integer"+
					")";
		transaction.executeSql(sql);*/
		
		/* D_Techno */
/*		var sql =	"CREATE TABLE IF NOT EXISTS D_Techno (" +
						"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
						"title VARCHAR(100) NOT NULL,"+
						"description VARCHAR(500) NULL,"+
						"dt_meta_cre integer,"+
						"dt_meta_maj integer,"+
						"dt_meta_del integer"+
					")";
		transaction.executeSql(sql);*/
		
		/* D_Action */
/*		var sql =	"CREATE TABLE IF NOT EXISTS D_Action (" +
						"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
						"title VARCHAR(100) NOT NULL,"+
						"description VARCHAR(500) NULL,"+
						"id_Phase_Projet INTEGER NULL,"+
						"id_Techno INTEGER NULL,"+
						"dt_meta_cre integer,"+
						"dt_meta_maj integer,"+
						"dt_meta_del integer"+
					")";
		transaction.executeSql(sql);*/
		
		/* R_Demande_Phase_Projet */
/*		var sql =	"CREATE TABLE IF NOT EXISTS R_Demande_Phase_Projet (" +
						"id_Demande INTEGER," +
						"id_Phase_Projet INTEGER," +
						"dt_meta_cre integer,"+
						"dt_meta_maj integer,"+
						"dt_meta_del integer"+
					")";
		transaction.executeSql(sql);*/
		
		/* R_Demande_Techno */
/*		var sql =	"CREATE TABLE IF NOT EXISTS R_Demande_Techno (" +
						"id_Demande INTEGER," +
						"id_Techno INTEGER," +
						"dt_meta_cre integer,"+
						"dt_meta_maj integer,"+
						"dt_meta_del integer"+
					")";
		transaction.executeSql(sql);*/
		
		/* R_Demande_Action */
/*		var sql =	"CREATE TABLE IF NOT EXISTS R_Demande_Action (" +
						"id_Demande INTEGER," +
						"id_Action INTEGER," +
						"dt_meta_cre integer,"+
						"dt_meta_maj integer,"+
						"dt_meta_del integer"+
					")";
		transaction.executeSql(sql);*/
		
//	});
	
	cloture("}");

	return db;
}

function addDemande(strDemande){
	if(strDemande!="") {
		SQL_AddDemande(strDemande);
		$('#newDemande').val('');
		SQL_RefreshListDemandes();
	}
}

function validPhase(){
	var resultat = SQL_GetValuesListPhaseProjet();
	alert(resultat);
}

/* Log */
function lancement(message){
	console.log(message);
}

function cloture(message){
	console.log(message);
}

function log(message){
	console.log("	"+message);
}

function errorHandler(transaction, error) {
	console.log('Error: ' + error.message + ' code: ' + error.code);
}

function nullHandler() {};

function successCallBack() {
	console.log("DEBUGGING: success");
}

/* Execute SQL with error management */
function executeSQL(db, sql){
	db.transaction(function (transaction) {
		transaction.executeSql(sql, [],
			function (transaction, result) {
				if (result != null && result.rows != null) {
					console.log(result.rows)
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						console.log(row.Name);
					}
				}
			}, errorHandler);
		}, errorHandler, nullHandler);
}

function getCurrentDemande() {
	console.log("getCurrentDemande()");
	//alert("Get : "+$("#idCurrentDemande").val());
	var idCurrentVariable = localStorage.getItem("idCurrentDemande");
	//return $("#idCurrentDemande").val();
	return idCurrentVariable;
}

function setCurrentDemande(idCurrentVariable) {
	console.log("setCurrentDemande("+idCurrentVariable+")");
	$("#idCurrentDemande").val(idCurrentVariable);
	localStorage.setItem("idCurrentDemande",idCurrentVariable)
	//alert("SET : "+idCurrentVariable);
}

function beginClassification() {
	console.log("beginClassification()");
	localStorage.setItem("classificationInProgress","1");
}

function endClassification() {
	console.log("endClassification()");
	localStorage.setItem("classificationInProgress","0");
}

function isClassificationInProgress() {
	var classificationInProgress = localStorage.getItem("classificationInProgress");
	console.log("isClassificationInProgress : "+classificationInProgress);
	return classificationInProgress;
}