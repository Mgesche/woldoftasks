/* Add a row in the table */
function SQL_AddPhaseProjet(strPhaseProjet){
	var sql = "INSERT INTO D_Phase_Projet (title, dt_meta_cre) VALUES ('" + strPhaseProjet.replace("'", "''") + "', DATETIME('now'));";
	executeSQL(db, sql);
}

/* Clear the table */
function SQL_ClearPhaseProjet(){
	var sql = "DELETE FROM D_Phase_Projet;";
	executeSQL(db, sql);
}

/* Insert sample data */
function SQL_SamplePhaseProjet(){
	SQL_AddPhaseProjet("Avant Vente");
	SQL_AddPhaseProjet("Analyse Fonctionelle");
	SQL_AddPhaseProjet("Analyse Technique");
	SQL_AddPhaseProjet("Réalisation");
	SQL_AddPhaseProjet("Recette");
	SQL_AddPhaseProjet("Livraison");
}

/* Show every item on the listview */
function SQL_RefreshListPhaseProjet(){
	var idCurrentDemande = getCurrentDemande();
	if(idCurrentDemande == "0"){
		var html = "<fieldset data-role=\"controlgroup\"><legend>Aucune demande en attente de classification</legend></fieldset>";
		var $content = $("#ListPhaseProjet");
		$content.html(html);
		$('#PageClassificationPhase').trigger('create');
	}
	else {
	db.transaction(function(transaction){
		var sql = "SELECT id, title FROM D_Phase_Projet WHERE dt_meta_del IS NULL ORDER BY id;";
		transaction.executeSql (sql, undefined, 
		function (transaction, result)
		{
			var html = "<fieldset data-role=\"controlgroup\"><legend>Phase du projet :</legend>";
			if (result.rows.length){
				for (var i = 0; i < result.rows.length; i++){
					var row = result.rows.item (i);
					var title = row.title;
					var id    = row.id;
					html += "<input type=\"checkbox\" name=\"chb"+title.replace(" ", "")+"\" id=\"chbPhase"+id+"\" onClick=\"SQL_UpdatePhaseProjet("+idCurrentDemande+", "+id+");SQL_RefreshListAction();\">";
					html += "<label for=\"chbPhase"+id+"\">"+title+"</label>";
			}
		  }
		  else {}
		  
		  html += "</fieldset>";
		  
		  var $content = $("#ListPhaseProjet");
		  $content.html(html);
		  $('#PageClassificationPhase').trigger('create');
		});
	});
	}
}

/* Get the values of every item on the listview */
/* TODO */
function SQL_GetValuesListPhaseProjet(){
	var resultat = "";
	db.transaction(function(transaction){
		var sql = "SELECT id FROM D_Phase_Projet WHERE dt_meta_del IS NULL ORDER BY id;";
		transaction.executeSql (sql, undefined, 
		function (transaction, result){
			if (result.rows.length){
				resultat = result.rows.length;
				for (var i = 0; i < result.rows.length; i++){
					var row = result.rows.item (i);
					var id = row.id;
					if(document.getElementById("chbPhase"+id).checked){
						resultat = resultat + "1";
					} else {
						resultat = resultat + "0";
					}
					alert(resultat);
				}
			}
			else {}
		});
	});
	return resultat;
}

/* Update the value by checkbox */
function SQL_UpdatePhaseProjet(idDemande, idPhase){

	lancement("SQL_UpdatePhaseProjet {");
	
	if(document.getElementById("chbPhase"+idPhase).checked){
		var sql = "INSERT INTO R_Demande_Phase_Projet (id_Demande, id_Phase_Projet, dt_meta_cre) values ('"+idDemande+"', '"+idPhase+"', DATETIME('now'));";
		log(sql);
		executeSQL(db, sql);
	} else {
		var sql = "UPDATE R_Demande_Phase_Projet SET dt_meta_del = DATETIME('now') WHERE id_Demande = '"+idDemande+"' AND id_Phase_Projet = '"+idPhase+"' AND dt_meta_del IS NULL;";
		log(sql);
		executeSQL(db, sql);
	}
	
	cloture("}");
}