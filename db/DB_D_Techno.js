/* Add a row in the table */
function SQL_AddTechno(strTechno){
	var sql = "INSERT INTO D_Techno (title, dt_meta_cre) VALUES ('" + strTechno.replace("'", "''") + "', DATETIME('now'));";
	executeSQL(db, sql);
}

/* Clear the table */
function SQL_ClearTechno(){
	var sql = "DELETE FROM D_Techno;";
	executeSQL(db, sql);
}

/* Insert sample data */
function SQL_SampleTechno(){
	SQL_AddTechno("Sql Server");
	SQL_AddTechno("SSIS");
	SQL_AddTechno("SSAS");
	SQL_AddTechno("SSRS");
	SQL_AddTechno("Sharepoint");
}

/* Show every item on the listview */
function SQL_RefreshListTechno(){
	idCurrentDemande = getCurrentDemande();
	if(idCurrentDemande == "0"){
		var html = "<fieldset data-role=\"controlgroup\"><legend>Aucune demande en attente de classification</legend></fieldset>";
		var $content = $("#ListTechno");
		$content.html(html);
		$('#PageClassificationTechno').trigger('create');
	}
	else {
	db.transaction(function(transaction){
		var sql = "SELECT id, title FROM D_Techno WHERE dt_meta_del IS NULL ORDER BY title;";
		transaction.executeSql (sql, undefined, 
		function (transaction, result)
		{
			var html = "<fieldset data-role=\"controlgroup\"><legend>Technologie :</legend>";
			if (result.rows.length){
				for (var i = 0; i < result.rows.length; i++){
					var row = result.rows.item (i);
					var title = row.title;
					var id = row.id;
					html += "<input type=\"checkbox\" name=\"chb"+title.replace(" ", "")+"\" id=\"chbTechno"+id+"\" onClick=\"SQL_UpdateTechno("+idCurrentDemande+", "+id+");SQL_RefreshListAction();\">";
					html += "<label for=\"chbTechno"+id+"\">"+title+"</label>";
			}
		  }
		  else {}
		  
		  html += "</fieldset>";
		  
		  var $content = $("#ListTechno");
		  $content.html(html);
		  $('#PageClassificationTechno').trigger('create');
		});
	});
	}
}

/* Update the value by checkbox */
function SQL_UpdateTechno(idDemande, idTechno){

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