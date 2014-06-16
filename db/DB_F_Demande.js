/* Add a row in the table */
function SQL_AddDemande(strDemande){
	var sql = "INSERT INTO F_demande (title, dt_meta_cre) VALUES ('" + strDemande.replace("'", "''") + "', DATETIME('now'));";
	executeSQL(db, sql);
}

/* Clear the table */
function SQL_ClearDemande(){
	var sql = "DELETE FROM F_demande;";
	executeSQL(db, sql);
}

/* Insert sample data */
function SQL_SampleDemande(){
	SQL_AddDemande("None");
	SQL_AddDemande("Try");
	SQL_AddDemande("Other try");
}

/* Show every item on the listview */
function SQL_RefreshListDemandes(){
	db.transaction(function(transaction){
		var sql = "SELECT title FROM F_demande WHERE dt_meta_del IS NULL ORDER BY title;";
		transaction.executeSql (sql, undefined, 
		function (transaction, result){
			var html = "<ul data-role=\"listview\" data-filter=\"true\" data-filter-placeholder=\"Demande...\" data-inset=\"true\" id=\"listDemande\">";
			if (result.rows.length){
				for (var i = 0; i < result.rows.length; i++){
					var row = result.rows.item (i);
					var title = row.title;
					html += "<li><a href=\"#\">" + title + "</a></li>";
				}
			}
			else {}

			html += "</ul>";
		
			var $content = $("#ListDemande");
			$content.html(html);
			var $ul = $content.find("ul");
			$ul.listview();

		});
	});
}

/* Show the first item without project phase */
function SQL_RefreshListDemandesClassificationPhase(){
	db.transaction(function(transaction){
		var sql = "SELECT id, title FROM F_demande DEM LEFT JOIN R_Demande_Phase_Projet REL ON REL.ID_Demande = DEM.id WHERE DEM.dt_meta_del IS NULL AND REL.ID_Demande IS NULL ORDER BY DEM.dt_meta_cre LIMIT 1;";
		transaction.executeSql (sql, undefined, 
		function (transaction, result){
			var html = "<ul data-role=\"listview\" data-inset=\"true\" id=\"ulListDemandeClassificationPhase\">";
			if (result.rows.length){
				for (var i = 0; i < result.rows.length; i++){
					var row = result.rows.item (i);
					var title = row.title;
					var id = row.id;
					html += "<li><a href=\"#\">" + title + "</a></li>";
				}
				idCurrentDemande = id;
				setCurrentDemande(idCurrentDemande);
			}
			else {}

			html += "</ul>";
		
			var $content = $("#ListDemandeClassificationPhase");
			$content.html(html);
			var $ul = $content.find("ul");
			$ul.listview();
		});
	}, function(){
		//--- error handling
	}, function(){
		//--- success handling
		SQL_RefreshListPhaseProjet();
	});
}

/* Show the first item without techno */
function SQL_RefreshListDemandesClassificationTechno(){
	db.transaction(function(transaction){
		var sql = "SELECT id, title FROM F_demande DEM LEFT JOIN R_Demande_Techno REL ON REL.ID_Demande = DEM.id WHERE DEM.dt_meta_del IS NULL AND REL.ID_Demande IS NULL ORDER BY DEM.dt_meta_cre LIMIT 1;";
		transaction.executeSql (sql, undefined, 
		function (transaction, result){
			var html = "<ul data-role=\"listview\" data-inset=\"true\" id=\"ulListDemandeClassificationTechno\">";
			if (result.rows.length){
				for (var i = 0; i < result.rows.length; i++){
					var row = result.rows.item (i);
					var title = row.title;
					var id = row.id;
					html += "<li><a href=\"#\">" + title + "</a></li>";
				}
				idCurrentDemande = id;
				setCurrentDemande(idCurrentDemande);
			}
			else {}

			html += "</ul>";
		
			var $content = $("#ListDemandeClassificationTechno");
			$content.html(html);
			var $ul = $content.find("ul");
			$ul.listview();

		});
	}, function(){
		//--- error handling
	}, function(){
		//--- success handling
		SQL_RefreshListPhaseProjet();
	});
}

/* Show the first item without actions */
function SQL_RefreshListDemandesClassificationAction(){
	db.transaction(function(transaction){
		var sql = "SELECT id, title FROM F_demande DEM LEFT JOIN R_Demande_Action REL ON REL.ID_Demande = DEM.id WHERE DEM.dt_meta_del IS NULL AND REL.ID_Demande IS NULL ORDER BY DEM.dt_meta_cre LIMIT 1;";
		transaction.executeSql (sql, undefined, 
		function (transaction, result){
			var html = "<ul data-role=\"listview\" data-inset=\"true\" id=\"ulListDemandeClassificationAction\">";
			if (result.rows.length){
				for (var i = 0; i < result.rows.length; i++){
					var row = result.rows.item (i);
					var title = row.title;
					var id = row.id;
					html += "<li><a href=\"#\">" + title + "</a></li>";
				}
				idCurrentDemande = id;
				setCurrentDemande(idCurrentDemande);
			}
			else {}

			html += "</ul>";
		
			var $content = $("#ListDemandeClassificationAction");
			$content.html(html);
			var $ul = $content.find("ul");
			$ul.listview();

		});
	}, function(){
		//--- error handling
	}, function(){
		//--- success handling
		SQL_RefreshListPhaseProjet();
	});
}