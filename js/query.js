var db = null;
 
 var db = openDatabase('delicook', '1', 'delicook', 2 * 1024 * 1024);
	db.transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS user(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, created unique, email, username, password)');
	});

	$('document').ready(function(){
		var db = openDatabase('delicook', '1', 'delicook', 2 * 1024 * 1024);
		
	db.transaction(function(tx){
			tx.executeSql('SELECT * FROM user', [], querySuccess, errorCB);	
	});
	
	function querySuccess(tx, results){
			var len = results.rows.length;
				if(len > 0){
					
					console.log("Currently have "+len+" users registered");
					}
				
				else{
					console.log("No users registered yet");
				}
				
		}
		function errorCB(err){
		 alert("Error" + err.code);
		}
	});


$("#signupbtn").click(function(){
	var email = $("#email").val();
	var password = $("#password").val();
	var username = $("#username").val();
	var cfm_passwd = $("#cfm_password").val();
	var created = $.now();
	
	if(password == cfm_passwd){
	function populateDB(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS user(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, created unique, email, username, password)');
			tx.executeSql('INSERT INTO user(created, email, username, password) VALUES(?, ?, ?, ?)', [created, email, username, password]);
			}
		function errorCB(err){
			alert("error");
			}
		function successCB(){
			$.mobile.changePage( $("#signup2"), "slide", true, true);
		}
		var db = openDatabase('delicook', '1', 'delicook', 2 * 1024 * 1024);
		db.transaction(populateDB,errorCB,successCB);
		
		}else{
				alert("Password confirmation is wrong");
			
			}
		
	});
	
	
$("#loginbtn").click(function(){
	var email = $("#loginemail").val();
	var password = $("#loginpassword").val();
	
	$('document').ready(function(){
		var db = openDatabase('delicook', '1', 'delicook', 2 * 1024 * 1024);
	    db.transaction(function(tx){
			tx.executeSql('SELECT * FROM user WHERE email=? and password=?', [email,password], querySuccess, errorCB);
		});
			
		function querySuccess(tx, results){
			var len = results.rows.length;
				if(len > 0){
						$.mobile.changePage( $("#profile"), "slide", true, true);
				}
				else {
					alert("Wrong email or password")
				}
				
		}
		
		function errorCB(err){
		 alert("Error" + err.code);
		}
	});
});