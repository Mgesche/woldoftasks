/* Add a row in the table */
function SQL_AddAction(id_Phase_Projet, id_Techno, strAction){
	var sql = "INSERT INTO D_Action (id_Phase_Projet, id_Techno, title, dt_meta_cre) VALUES ('" + id_Phase_Projet + "', '" + id_Techno + "', '" + strAction.replace("'", "''") + "', DATETIME('now'));";
	executeSQL(db, sql);
}

/* Clear the table */
function SQL_ClearAction(){
	var sql = "DELETE FROM D_Action;";
	executeSQL(db, sql);
}

/* Insert sample data */
function SQL_SampleAction(){
	SQL_AddAction(1, 1,"11");
	SQL_AddAction(1, 2,"12");
	SQL_AddAction(1, 3,"13");
	SQL_AddAction(1, 4,"14");
	SQL_AddAction(1, 5,"15");
	SQL_AddAction(1, 6,"16");
	SQL_AddAction(1, 7,"17");
	SQL_AddAction(1, 8,"18");
	SQL_AddAction(2, 1,"21");
	SQL_AddAction(2, 2,"22");
	SQL_AddAction(2, 3,"23");
	SQL_AddAction(2, 4,"24");
	SQL_AddAction(2, 5,"25");
	SQL_AddAction(2, 6,"26");
	SQL_AddAction(2, 7,"27");
	SQL_AddAction(2, 8,"28");
}

/* Show every item on the listview */
function SQL_RefreshListAction(){
	idCurrentDemande = getCurrentDemande();
	if(idCurrentDemande == "0"){
		var html = "<fieldset data-role=\"controlgroup\"><legend>Aucune demande en attente de classification</legend></fieldset>";
		var $content = $("#ListDemandeAction");
		$content.html(html);
		$('#PageClassificationAction').trigger('create');
	}
	else {
		db.transaction(function(transaction){
			var sql =   "SELECT DISTINCT ACT.id, ACT.title FROM F_Demande DEM "
			sql = sql + "JOIN R_Demande_Phase_Projet REL_PHA ON REL_PHA.ID_Demande = DEM.Id AND REL_PHA.dt_meta_del IS NULL "
			sql = sql + "JOIN R_Demande_Techno REL_TEC ON REL_TEC.ID_Demande = DEM.Id AND REL_TEC.dt_meta_del IS NULL "
			sql = sql + "JOIN D_Action ACT ON ACT.ID_Phase_Projet = REL_PHA.ID_Phase_Projet AND ACT.ID_Techno = REL_TEC.ID_Techno AND ACT.dt_meta_del IS NULL "
			sql = sql + "WHERE DEM.id ='"+idCurrentDemande+"' ORDER BY ACT.title;"
			transaction.executeSql (sql, undefined, 
			function (transaction, result){
				console.log(sql);
				var html = "<fieldset data-role=\"controlgroup\"><legend>Phase du projet :</legend>";
				console.log("Nb actions : "+result.rows.length);
				if (result.rows.length){
					for (var i = 0; i < result.rows.length; i++){
						var row = result.rows.item (i);
						var title = row.title;
						var id    = row.id;
						html += "<input type=\"checkbox\" name=\"chb"+title.replace(" ", "")+"\" id=\"chbAction"+id+"\" onClick=\"SQL_UpdateDemandeAction("+idCurrentDemande+", "+id+");\">";
						html += "<label for=\"chbAction"+id+"\">"+title+"</label>";
					}
				}
				else {}

				html += "</fieldset>";
			
				var $content = $("#ListAction");
				$content.html(html);
				$('#PageClassificationAction').trigger('create');
			});
		});
	}
}

/* Update the value by checkbox */
function SQL_UpdateDemandeAction(idDemande, idAction){

	lancement("SQL_UpdateAction {");
	
	if(document.getElementById("chbAction"+idAction).checked){
		var sql = "INSERT INTO R_Demande_Action (id_Demande, id_Action, dt_meta_cre) values ('"+idDemande+"', '"+idAction+"', DATETIME('now'));";
		log(sql);
		executeSQL(db, sql);
	} else {
		var sql = "UPDATE R_Demande_Action SET dt_meta_del = DATETIME('now') WHERE id_Demande = '"+idDemande+"' AND id_Action = '"+idAction+"' AND dt_meta_del IS NULL;";
		log(sql);
		executeSQL(db, sql);
	}
	
	cloture("}");
}