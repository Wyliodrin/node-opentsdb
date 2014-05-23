node-opentsdb
=============

Folder structure:

opentsdb > example folder:  contains two files insert.js & select.js. They are samples of insert call & select call using metric/tsuid query (it is not a full functional call, just a sample of insert/select !!!)

opentsdb > model folder: contains "constructors" of data type used by select/insert calls. Please use these "constructors" for any select/insert call (there are some validations used inside of them)

opentsdb > connection.js:  it contains API calls to openTSDB (select/insert) and some settings. Please set here below variables, according to your values: 

	var HOST = "172.16.130.71"; //opentsdb ip machine 
	var PORT = "4242"; //opentsdb port 

opentsdb > util.js: it contains some validation functions together with some enumerations



 
 	 
 	


