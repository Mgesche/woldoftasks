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
			var sql =   "SELECT DISTINCT ACT.title FROM F_Demande DEM "
			sql = sql + "JOIN R_Demande_Phase_Projet REL_PHA ON REL_PHA.ID_Demande = DEM.Id AND REL_PHA.dt_meta_del IS NULL "
			sql = sql + "JOIN R_Demande_Techno REL_TEC ON REL_TEC.ID_Demande = DEM.Id AND REL_TEC.dt_meta_del IS NULL "
			sql = sql + "JOIN D_Action ACT ON ACT.ID_Phase_Projet = REL_PHA.ID_Phase_Projet AND ACT.ID_Techno = REL_TEC.ID_Techno AND ACT.dt_meta_del IS NULL "
			sql = sql + "WHERE DEM.id ='"+idCurrentDemande+"' ORDER BY ACT.title;"
			transaction.executeSql (sql, undefined, 
			function (transaction, result){
				var html = "<ul data-role=\"listview\" data-filter=\"true\" data-filter-placeholder=\"Action...\" data-inset=\"true\" id=\"listAction\">";
				if (result.rows.length){
					for (var i = 0; i < result.rows.length; i++){
						var row = result.rows.item (i);
						var title = row.title;
						html += "<li><a href=\"#\">" + title + "</a></li>";
					}
				}
				else {}

				html += "</ul>";
			
				var $content = $("#ListDemandeAction");
				$content.html(html);
				var $ul = $content.find("ul");
				$ul.listview();
			});
		});
	}
}

/* Update the value by checkbox */
function SQL_UpdateDemandeAction(idDemande, idTechno){

	lancement("SQL_UpdateTechno {");
	
	if(document.getElementById("chbTechno"+idTechno).checked){
		var sql = "INSERT INTO R_Demande_Techno (id_Demande, id_Techno, dt_meta_cre) values ('"+idDemande+"', '"+idTechno+"', DATETIME('now'));";
		log(sql);
		executeSQL(db, sql);
	} else {
		var sql = "UPDATE R_Demande_Techno SET dt_meta_del = DATETIME('now') WHERE id_Demande = '"+idDemande+"' AND id_Techno = '"+idTechno+"' AND dt_meta_del IS NULL;";
		log(sql);
		executeSQL(db, sql);
	}
	
	cloture("}");
}