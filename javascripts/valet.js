
	//-- Links check
	var linksPerRequest = 5;


	$(function() {
		if ($("#uacustom").val() == '') {
			ua_onchange();
		}

		setResolution();

		try {
			//console.log('updateobject');
			updateObject();
			
			//console.log('createchart');
			createChart();

			//console.log('setdataxml');
			setDataXML(0);
		} catch(e) {
		}
	});

	window.onresize = setResolution;


	//-- main form (URI, HTTP Protocol, user agent, etc)
	function ua_onchange() {
		$("#uacustom").val($("#ua").val());
	}

	function uacustom_onchange() {
		$("#ua").attr("selectedIndex","-1");
	}

	function usemybrowserUA() {
		$("#ua").attr("selectedIndex", "0");
		ua_onchange();
	}

	function setmodifiedsince() {
		msval = $("#modifiedsinceval").val();
		msunit = $("#modifiedsinceunit").val();

		if (msval == '') {
			$("#modifiedsince").val("");
			return;
		}
		if (msunit == '') {
			$("#modifiedsince").val("");
			return;
		}

		var d = new Date();
		var sec = '';
		if (msunit == 'Seconds') {
			sec = (1000 * msval)
		}
		if (msunit == 'Minutes') {
			sec = (1000 * 60 * msval)
		}
		if (msunit == 'Hours') {
			sec = (1000 * 60 * 60 * msval)
		}
		if (msunit == 'Days') {
			sec = (1000 * 60 * 60 * 24 * msval)
		}
		var dGMT = new Date(d.getTime() - sec);
		$("#modifiedsince").val(dGMT.toGMTString().replace('UTC','GMT'));

	}

	//-- Contact Us form  //-----------------------
	function showCommentForm() {
		if (document.getElementById('frmComment').style.display=='') {
			$('#frmComment').hide();
		} else {
			$('#frmComment').show();
			$('#commentStatus').html('');
			document.frmComment.contactName.focus();
			document.frmComment.contactName.select();
		}
	}
	function submitComplete(o) {
		document.getElementById('commentStatus').innerHTML = '<br />' + o.message;
		if (o.errorCode == '0') {
			$('#commentForm').hide();
		}
	}



	//-- set the viewpoint and other values //-----------------------------
	function setResolution() {
		if (self.innerWidth) {
			vpw = self.innerWidth;
			vph = self.innerHeight;
		} else if (document.documentElement&&document.documentElement.clientWidth) {
			vpw = document.documentElement.clientWidth;
			vph = document.documentElement.clientHeight;
		} else {
			vpw = document.body.clientWidth;
			vph = document.body.clientHeight;
		}

		var myForm = document.getElementById('frmURI');
		myForm.VPclientWidth.value = vpw;
		myForm.VPclientHeight.value = vph;
		myForm.VPavailWidth.value = screen.availWidth;
		myForm.VPavailHeight.value = screen.availHeight;
		myForm.VPscreenWidth.value = screen.width;
		myForm.VPscreenHeight.value = screen.height;

	}





	//-- show the Connection type in form
	function setConnection() {
		if (document.getElementById('frmURI').protocol[0].checked) {
			$('#divConnection').show();
		} else {
			$('#divConnection').hide();
		}
	}


	//-- show the analyzing... message and hide the result
	function showAnalyzingMessage() {
		//document.frmURI.action='http://urivalet.com/?' + document.frmURI.URI.value + '#Report';
		$('#frmURI').attr('action','http://aerovin.github.io/uriheader/?' + $('#uri').val() + '#Report');
		$('#divAnalyzing').show();
		$('#result').hide();
	}


	function hideAll(itemId) {
		$('#divHtml_' + itemId).hide();
		$('#divText_' + itemId).hide();
		$('#divPreview_' + itemId).hide();
		$('#divSemanticExtractor_' + itemId).hide();
		$('#divUnicorn_' + itemId).hide();
		$('#divW3CVNU_' + itemId).hide();
		$('#divW3CCSSValidator_' + itemId).hide();
		$('#divGoogleRichSnippetsTool_' + itemId).hide();
	}

	function showHtml(itemId) {
		hideAll(itemId);
		$('#divHtml_' + itemId).show();
	}

	function showText(itemId) {
		hideAll(itemId);
		$('#divText_' + itemId).show();
	}

	function showPreview(itemId) {
		hideAll(itemId);
		if ($("#divPreview_" + itemId).length == 0) {
			text = "<iframe style='width:99.5%;height:300px;border:1px solid #e2e2ec;' id='divPreview_" + itemId + "' src='preview?ua=" + escape($("#ua").val()) + "&uri=" + escape($('#divHtml_' + itemId).attr('src')) + "'></iframe>";
			$("#divText_" + itemId).after(text);
		}
		$('#divPreview_' + itemId).show();
	}


    function showSemanticExtractor(itemId) {
        hideAll(itemId);
		if ($("#divSemanticExtractor_" + itemId).length == 0) {
			text = "<iframe style='width:99.5%;height:300px;border:1px solid #e2e2ec;' id='divSemanticExtractor_" + itemId + "' src='http://www.w3.org/2005/08/online_xslt/xslt?xmlfile=http%3A%2F%2Fcgi.w3.org%2Fcgi-bin%2Ftidy-if%3FdocAddr%3D" + escape($('#divHtml_' + itemId).attr('src')) + "&xslfile=http%3A%2F%2Fwww.w3.org%2F2002%2F08%2Fextract-semantic.xsl'></iframe>";
			$("#divText_" + itemId).after(text);
		}
		$('#divSemanticExtractor_' + itemId).show();
    }


	function showUnicorn(itemId) {
		hideAll(itemId);
		if ($("#divUnicorn_" + itemId).length == 0) {
			text = "<iframe style='width:99.5%;height:300px;border:1px solid #e2e2ec;' id='divUnicorn_" + itemId + "' src='http://validator.w3.org/unicorn/check?ucn_uri=" + escape($('#divHtml_' + itemId).attr('src')) + "&ucn_task=conformance#'></iframe>";
			$("#divText_" + itemId).after(text);
		}
		$('#divUnicorn_' + itemId).show();
	}

	function showW3CVNU(itemId) {
		hideAll(itemId);
		if ($("#divW3CVNU_" + itemId).length == 0) {
			text = "<iframe style='width:99.5%;height:300px;border:1px solid #e2e2ec;' id='divW3CVNU_" + itemId + "' src='http://validator.w3.org/nu/?doc=" + escape($('#divHtml_' + itemId).attr('src')) + "&ucn_task=conformance#'></iframe>";
			$("#divText_" + itemId).after(text);
		}
		$('#divW3CVNU_' + itemId).show();
	}

	function showW3CCSSValidator(itemId) {
		hideAll(itemId);
		if ($("#divW3CCSSValidator_" + itemId).length == 0) {
			text = "<iframe style='width:99.5%;height:300px;border:1px solid #e2e2ec;' id='divW3CCSSValidator_" + itemId + "' src='http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri=" + escape($('#divHtml_' + itemId).attr('src')) + "&ucn_task=conformance#'></iframe>";
			$("#divText_" + itemId).after(text);
		}
		$('#divW3CCSSValidator_' + itemId).show();
	}

	function showGoogleRichSnippetsTool(itemId) {

		//-- load the w3c unicorn validator if it has not been loaded yet
		window.open('http://www.google.com/webmasters/tools/richsnippets?url=' + escape($('#divHtml_' + itemId).attr('src')) + '');

	}


	//-- REDIRECT CHECK//------------------------

	var g_UpdatingLinkInt = false;
	var g_UpdatingLinkExt = false;
	var g_UpdateLinkCancelInt = false;
	var g_UpdateLinkCancelExt = false;

	//-- use for checking the starting value.
	//   if on the next loop it's still the same id then we're not moving forward.
	//   in that case, break.
	var g_StartingLinkIDInt = '-1';
	var g_StartingLinkIDExt = '-1';

	function cancelLinkCheck() {
		if (g_UpdatingLinkInt) {
			$('#divCheckLinkInt').show();
			$('#divCheckingLinkInt').hide();
			g_UpdateLinkCancelInt = true;
		}
		if (g_UpdatingLinkExt) {
			$('#divCheckLinkExt').show();
			$('#divCheckingLinkExt').hide();
			g_UpdateLinkCancelExt = true;
		}
	}


	//-- Only update the links that are in the same domain.
	function updateLinkInt() {
		if (g_UpdatingLinkInt) { return }
		g_UpdatingLinkInt = true;

		//-- the links table
		var myTbl = document.getElementById('tbLinksInt').tBodies[0];
		if (myTbl == null) { return }



		//-- destination URI is from the <td id='destinationURI'> in the report
		var rowsAdded = 0;
		var qs = 'ct=1';
		var myStartingLinkIDInt = '';

		for (i=0;i<myTbl.rows.length;i++) {
			if (rowsAdded >= linksPerRequest) { break }
			myURI = myTbl.rows[i].getElementsByTagName("a")[0].innerHTML;
			if (myTbl.rows[i].cells[5].innerHTML == '&nbsp;' ) {

				if (i == g_StartingLinkIDInt) { return }
				myStartingLinkIDInt = (myStartingLinkIDInt == '') ? i : myStartingLinkIDInt;

				qs += '&uri_' + i + '=' + escape(myURI);
				rowsAdded++;
			}
		}
		//qs += '}'


		if (qs != 'ct=1') {
			g_StartingLinkIDInt = myStartingLinkIDInt;

			
			$.ajax( {
				url: "/updateLinkRedirect",
				data: qs,
				success: function(data) {
					setLinkInt(data);
				},
				dataType: 'json',
				type: 'POST',
				error: function(jqXHR, textStatus, errorThrown) {alert(textStatus); alert(errorThrown);}
			});


			$('#divCheckLinkInt').hide();
			$('#divCheckingLinkInt').show();
			$('#divCheckingLinkProgressInt').html(Math.round(((i-linksPerRequest)>0 ? (i-linksPerRequest) : 0)/myTbl.rows.length*100) + '%');
		} else {
			$('#divCheckLinkInt').hide();
			$('#divCheckingLinkInt').hide();
			g_UpdatingLinkInt = false;
		}
	}

	function setLinkInt(o) {
		var myTbl = document.getElementById('tbLinksInt').tBodies[0];
		var myId = '';
		var finalStatus = '';
		var myURIList = '';
		var myStatusList = '';
		var lastStatus = '';
		var redirectFound = false;

		for (var i=0; i < o.length;i=i) {
			link = o[i];
			redirectFound = false;
			try {

				if (link.URL != '') {

					myId = link.ID;
					myURIList = link.Status + ' | <a href="' + link.URL + '" target="_new">' + link.URL + '</a>';
					myStatusList = link.Status;
					finalStatus = link.Status;
					finalTime = link.Time;
					i++;
					while (i < o.length) {
						link = o[i];
						if (myId != link.ID) { break; }
						finalStatus = link.Status;
						finalTime = link.Time;
						myURIList += '<br />\n' + link.Status + ' | <img src="/images/redirect2.gif" width="16" height="16" alt="Redirect"> <a href="' + link.URL + '" target="_new">' + link.URL + '</a>';
						myStatusList += ' ' + link.Status;
						redirectFound = true;
						i++;
					}

					myTbl.rows[myId].cells[2].innerHTML = myURIList;
					myTbl.rows[myId].cells[2].setAttribute('statusList', myStatusList);
					myTbl.rows[myId].cells[5].innerHTML = finalTime; //time
					//-- if it's 400's mark it red
					if (finalStatus >= '400' && finalStatus <= '599') {
						for (x=0;x<=4;x++) {
							myTbl.rows[myId].cells[x].className+=' bgredlig';
						}
					}
					if (redirectFound) {
						myTbl.rows[myId].style.backgroundColor='#ff9';
					}
				} else {
					i++;
				}
			} catch(e) {
			}
		}

		//-- once we're done with current batch, retrieve the next batch
		g_UpdatingLinkInt = false;
		if (g_UpdateLinkCancelInt) {
			g_UpdateLinkCancelInt = false;
			return;
		}
		updateLinkInt();
	}



	//-- Update the rest of the links in different domain
	function updateLinkExt() {

		if (g_UpdatingLinkExt) { return }
		g_UpdatingLinkExt = true;

		var myTbl = document.getElementById('tbLinksExt').tBodies[0];
 		if (myTbl == null) { return }


		var rowsAdded = 0;
		var qs = 'ct=0';
		var myStartingLinkIDExt = '';

		for (i=0;i<myTbl.rows.length;i++) {
			if (rowsAdded >= linksPerRequest) { break }
			myURI = myTbl.rows[i].getElementsByTagName("a")[0].innerHTML;

			if (myTbl.rows[i].cells[5].innerHTML == '&nbsp;') {

				if (i == g_StartingLinkIDExt) { return }
				myStartingLinkIDExt = (myStartingLinkIDExt == '') ? i : myStartingLinkIDExt;

				qs += '&uri_' + i + '=' + escape(myURI);
				rowsAdded++;
			}
		}
		if (qs != 'ct=0') {
			g_StartingLinkIDExt = myStartingLinkIDExt;


			
			$.ajax( {
				url: "/updateLinkRedirect",
				data: qs,
				success: function(data) {
					setLinkExt(data);
				},
				dataType: 'json',
				type: 'POST',
				error: function(jqXHR, textStatus, errorThrown) {alert(textStatus); alert(errorThrown);}
			});


			$('#divCheckLinkExt').hide();
			$('#divCheckingLinkExt').show();
			$('#divCheckingLinkProgressExt').html(Math.round(((i-linksPerRequest)>0 ? (i-linksPerRequest) : 0)/myTbl.rows.length*100) + '%');
		} else {
			$('#divCheckLinkExt').hide();
			$('#divCheckingLinkExt').hide();
			g_UpdatingLinkExt = false;
		}
	}


	function setLinkExt(o) {
		var myTbl = document.getElementById('tbLinksExt').tBodies[0];
		var myId = '';
		var finalStatus = '';
		var myURIList = '';
		var myStatusList = '';
		var lastStatus = '';
		var redirectFound = false;
		for (var i=0; i < o.length;i=i) {
			link = o[i];
			redirectFound = false;
			try {
				if (link.URL != '') {
					
					consoleLog('setLinkExt: ' + link.URL + ' [status]' + link.Status);
					myId = link.ID;
					myURIList = link.Status + ' | <a href="' + link.URL + '" target="_new">' + link.URL + '</a>';
					myStatusList = link.Status;
					finalStatus = link.Status;
					finalTime = link.Time;
					i++;
					consoleLog('[myId]=[' + link.ID + '][' + i + '][' + o.length + '][url][' + link.URL + ']');
					while (i < o.length) {
						link = o[i];
						if (myId != link.ID) { break; }
						finalStatus = link.Status;
						finalTime = link.Time;
						myURIList += '<br />\n' + link.Status + ' | <img src="/images/redirect2.gif" width="16" height="16" alt="Redirect"> <a href="' + link.URL + '" target="_new">' + link.URL + '</a>';
						myStatusList += ' ' + link.Status;
						redirectFound = true;
						i++;
					}

					myTbl.rows[myId].cells[2].innerHTML = myURIList;
					myTbl.rows[myId].cells[2].setAttribute('statusList', myStatusList);
					myTbl.rows[myId].cells[5].innerHTML = finalTime; //time
					//-- if it's 400's mark it red
					if (finalStatus >= '400' && finalStatus <= '599') {
						for (x=0;x<=4;x++) {
							myTbl.rows[myId].cells[x].className+=' bgredlig';
						}
					}
					if (redirectFound) {
						myTbl.rows[myId].style.backgroundColor='#ff9';
					}
				} else {
					i++;
				}
			} catch(e) {
			}
		}

		//-- once we're done with current batch, retrieve the next batch
		g_UpdatingLinkExt = false;

		if (g_UpdateLinkCancelExt) {
			g_UpdateLinkCancelExt = false;
			return;
		}
		updateLinkExt();

	}



	function tagFilter(filter) {
		var myTbl = document.getElementById('tbObjects').tBodies[0];

		for (i=0;i<myTbl.rows.length;i++) {
			if (filter == 'Other' && (myTbl.rows[i].cells[6].innerHTML == filter || myTbl.rows[i].cells[6].innerHTML == '')) {
				myTbl.rows[i].style.display = '';
			} else if (filter == 'All' || filter == myTbl.rows[i].cells[6].innerHTML) {
				myTbl.rows[i].style.display = '';
			} else {
				myTbl.rows[i].style.display = 'none';
			}
		}
	}

	function httpStatusFilter(filter, ext) {
		if (ext == '1') {
			var myTbl = document.getElementById('tbLinksExt').tBodies[0];
		} else {
			var myTbl = document.getElementById('tbLinksInt').tBodies[0];
		}

		for (i=0;i<myTbl.rows.length;i++) {
			// get the status list

			myStatusList = myTbl.rows[i].cells[2].getAttribute('statusList');

			if (myStatusList == null) {
				break;
			}

			myRow = myTbl.rows[i];
			if (filter == 'Other') {
				if (myStatusList == '' || myStatusList == null) {myRow.style.display = ''}
				if (isNaN(myStatusList.replace(/\s+/,''))) {myRow.style.display = ''};
			} else if (filter == 'all') {
				myRow.style.display = '';
			} else if (myStatusList == '' || myStatusList == null) {
				myRow.style.display = 'none';
			} else if (!isNaN(filter)) {
				myRangeStart = filter.substring(0,1) + '00';
				myRangeEnd = filter.substring(0,1) + '99';
				myList = myStatusList.match(/\d{3}/g);
				statusFound = false;
				for (j=0;j<myList.length;j++) {
					if (myList[j] >= myRangeStart && myList[j] <= myRangeEnd) {
						statusFound = true;
					}
				}
				myRow.style.display = statusFound ? '' : 'none';

			} else {
				myRow.style.display = 'none';
			}

		}
	}



	//-----------------------------------------------------------------------
	var g_UpdatingObject = false;
	var g_UpdateObjectCancel = false;
	var g_StartingObjectID = '-1';

	function cancelObjectCheck() {
			if (g_UpdatingObject) {
				//document.getElementById('divCheckObject').style.display = '';
				//document.getElementById('divCheckingObject').style.display = 'none';
				g_UpdateObjectCancel = true;
			}
	}

	function updateObject() {
		
		

		if (g_UpdatingObject) { return }
		g_UpdatingObject = true;

		//-- the links table
		var myTbl = document.getElementById('tbObjects').tBodies[0];
		if (myTbl == null) { return }

		var rowsAdded = 0;
		var qs = 'ct=2';
		var myStartingObjectID = '';

		
		
		for (i=0;i<myTbl.rows.length;i++) {
			if (rowsAdded >= linksPerRequest) { break }
			myURI = myTbl.rows[i].getElementsByTagName('a')[0].innerHTML;
			if (myTbl.rows[i].cells[5].innerHTML == '&nbsp;') {
				if (i == g_StartingObjectID) { return }
				myStartingObjectID = (myStartingObjectID == '') ? i : myStartingObjectID;

				qs+= '&uri_' + i + '=' + escape(myURI) ;
				rowsAdded++;
			}
		}

		if (rowsAdded > 0) {
			g_StartingObjectID = myStartingObjectID;
			
			$.ajax( {
				url: "/updateLinkRedirect",
				data: qs,
				success: function(data) {
					setObject(data);
				},
				dataType: 'json',
				type: 'POST',
				error: function(jqXHR, textStatus, errorThrown) {alert(textStatus); alert(errorThrown);}
			});

		} else {
			g_UpdatingObject = false;
		}
	}

	function setObject(o) {
		var myTbl = document.getElementById('tbObjects').tBodies[0];
		var myId = '';
		var finalStatus = '';
		var myURIList = '';
		var myStatusList = '';
		var lastStatus = '';
		var redirectFound = false;
		for (i=0;i<o.length;i=i) {
			link = o[i];
			redirectFound = false;
			try {
				if (link.URL != '') {

					myId = link.ID;
					myURIList = link.Status + ' | <a href="' + link.URL + '" target="_new">' + link.URL + '</a>';
					myStatusList = link.Status;
					finalStatus = link.Status;
					finalTime = link.Time;
					finalSize = link.Size;
					finalType = link.Type;
					i++;
					while (i < o.length) {
						link = o[i];
						if (myId != link.ID) { break; }
						finalStatus = link.Status;
						finalTime = link.Time;
						finalSize = link.Size;
						finalType = link.Type;

						myURIList += '<br />\n' + link.Status + ' | <img src="/images/redirect2.gif" width="16" height="16" alt="Redirect"> <a href="' + link.URL + '" target="_new">' + link.URL + '</a>';
						myStatusList += ' ' + link.Status;
						redirectFound = true;
						i++;
					}

					myTbl.rows[myId].cells[2].innerHTML = myURIList;
					myTbl.rows[myId].cells[2].setAttribute('statusList', myStatusList);
					myTbl.rows[myId].cells[5].innerHTML = finalType; //type
					//-- if it's 400's mark it red
					if (finalStatus >= '400' && finalStatus <= '599') {
						for (x=0;x<=8;x++) {
							myTbl.rows[myId].cells[x].className+=' bgredlig';
						}
					} else {
						myTbl.rows[myId].cells[4].innerHTML = finalSize; //size
						myTbl.rows[myId].cells[6].innerHTML = getTag(finalType,myTbl.rows[myId].cells[6].innerHTML ); //tag
					}

					if (redirectFound) {
						myTbl.rows[myId].style.backgroundColor='#ff9';
					}
					//-- update the total
					setChartValue(myId, finalSize);

				} else {
					i++;
				}
			} catch(e) {
			}

		}

		//-- once we're done with current batch, retrieve the next batch
		g_UpdatingObject = false;
		if (g_UpdateObjectCancel) {
			g_UpdateObjectCancel = false;
			return;
		}

		updateObject();
	}


	// Updates the xml data

	function createChart() {
		var chart = new FusionCharts("/charts/Pie2D.swf?ChartNoDataText=Analyzing...", "objectCount", "340", "320", "0", "1");
		chart.setDataXML("<chart palette='1' caption='Unique Object Count' showValues='1' decimals='0' formatNumberScale='0' showFCMenuItem='0'></chart>");
		chart.render("chartObjectCount");

		var chart = new FusionCharts("/charts/Pie2D.swf?ChartNoDataText=Analyzing...", "objectSize", "340", "320", "0", "1");
		chart.setDataXML("<chart palette='1' caption='Unique Object Count' showValues='1' decimals='0' formatNumberScale='0' showFCMenuItem='0'></chart>");
		chart.render("chartObjectSize");

		var chart = new FusionCharts("/charts/Column2D.swf?ChartNoDataText=Analyzing...", "downloadTime", "400", "200", "0", "1");
		chart.setDataXML("<chart palette='1' caption='Download Time' xAxisName='' yAxisName='Time (seconds)' showValues='0' decimals='2' formatNumberScale='0' showFCMenuItem='0'></chart>");
		chart.render("chartDownloadTime");
	}

	function setDataXML(iRefresh) {

		try {
			var chartObj = getChartFromId("objectCount");

			chartObj.setDataXML("<chart palette='1' caption='Unique Object Count' showValues='1' decimals='0' formatNumberScale='0' showFCMenuItem='0' >" +
				"<set label='HTML' value='" + getChartValue('htmlCount') + "' />" +
				"<set label='Scripts' value='" + getChartValue('scriptCount') + "' />" +
				"<set label='CSS' value='" + getChartValue('cssCount') + "' />" +
				"<set label='XML' value='" + getChartValue('xmlCount') + "' />" +
				"<set label='Images' value='" + getChartValue('imgCount') + "' />" +
				"<set label='CSS Images' value='" + getChartValue('cssImgCount') + "' />" +
				"<set label='Multimedia' value='" + getChartValue('multimediaCount') + "' />" +
				"<set label='Other' value='" + getChartValue('otherCount') + "' />" +
				"</chart>"
			);

			//-- object size
			var chartObj = getChartFromId("objectSize");
			chartObj.setDataXML("<chart palette='1' caption='Object Size' showValues='1' decimals='0' formatNumberScale='0' showFCMenuItem='0' >" +
				"<set label='HTML' value='" + getChartValue('htmlSize') + "' />" +
				"<set label='Scripts' value='" + getChartValue('scriptSize') + "' />" +
				"<set label='CSS' value='" + getChartValue('cssSize') + "' />" +
				"<set label='XML' value='" + getChartValue('xmlSize') + "' />" +
				"<set label='Images' value='" + getChartValue('imgSize') + "' />" +
				"<set label='CSS Images' value='" + getChartValue('cssImgSize') + "' />" +
				"<set label='Multimedia' value='" + getChartValue('multimediaSize') + "' />" +
				"<set label='Other' value='" + getChartValue('otherSize') + "' />" +
				"</chart>"
			);
			//-- download time
			var chartObj = getChartFromId("downloadTime");
			chartObj.setDataXML("<chart palette='1' caption='Download Time' xAxisName='' yAxisName='Time (seconds)' showValues='0' decimals='2' formatNumberScale='0' showFCMenuItem='0' >" +
				"<set label='56K' value='" + getChartValue('dlTime56k') + "' />" +
				"<set label='128K' value='" + getChartValue('dlTime128k') + "' />" +
				"<set label='640K' value='" + getChartValue('dlTime640k') + "' />" +
				"<set label='1.5 Mbps' value='" + getChartValue('dlTime15Mbps') + "' />" +
				"<set label='3 Mbps' value='" + getChartValue('dlTime3Mbps') + "' />" +
				"<set label='6 Mbps' value='" + getChartValue('dlTime6Mbps') + "' />" +
				"</chart>"
			);
		} catch(e) {
		}

		if (g_UpdatingObject && iRefresh < 10) {
			iRefresh++
			window.setTimeout('setDataXML(' + iRefresh + ')',3000+(iRefresh*500));
		}
	}



	function getChartValue(id) {
		v = ($('#'+id).html().replace(/,/g,'')-0);
		consoleLog('getChartValue: ' + id + ': ' + v);
		return v;
	}

	function getTag(type,tag) {
		if (tag == 'HTML' || tag == 'Script' || tag == 'Image') { return tag}

		if (type.toLowerCase().indexOf('css') != -1) {
			return 'CSS';
		} else if (type.toLowerCase().indexOf('flash') != -1) {
			return 'Multimedia';
		} else if (type.toLowerCase().indexOf('shockwave') != -1) {
			return 'Multimedia';
		} else if (type.toLowerCase().indexOf('image') != -1) {
			return 'Image'
		} else if (type.toLowerCase().indexOf('text/x-component') != -1) {
			return 'Script'
		} else {
			return tag;
		}
	}

	function setChartValue(row,val) {

		var myTbl = document.getElementById('tbObjects').tBodies[0];
		var mySize = myTbl.rows[row].cells[4].innerHTML;
		var myType = myTbl.rows[row].cells[5].innerHTML;
		var myTag = myTbl.rows[row].cells[6].innerHTML;
		var myCSS = myTbl.rows[row].cells[7].innerHTML;
		var myBG = myTbl.rows[row].cells[8].innerHTML;

		mySize -= 0;


		if (myTag == 'HTML') {
			$('#htmlSize').html(formatNumber(getChartValue('htmlSize') + mySize, 0));
			document.getElementById('htmlCount').innerHTML++;
		} else if (myTag == 'CSS') {
			$('#cssSize').html(formatNumber(getChartValue('cssSize') + mySize, 0));
			document.getElementById('cssCount').innerHTML++;
		} else if (myTag == 'Script') {
			$('#scriptSize').html(formatNumber(getChartValue('scriptSize') + mySize, 0));
			document.getElementById('scriptCount').innerHTML++;
		} else if (myTag == 'XML') {
			$('#xmlSize').html(formatNumber(getChartValue('xmlSize') + mySize, 0));
			document.getElementById('xmltCount').innerHTML++;
		} else if (myTag == 'Image' && myCSS  == '') {
			$('#imgSize').html(formatNumber(getChartValue('imgSize') + mySize, 0));
			document.getElementById('imgCount').innerHTML++;
		} else if (myTag == 'Image') {
			$('#cssImgSize').html(formatNumber(getChartValue('cssImgSize') + mySize, 0));
			document.getElementById('cssImgCount').innerHTML++;
		} else if (myTag == 'Multimedia') {
			$('#multimediaSize').html(formatNumber(getChartValue('multimediaSize') + mySize, 0));
			document.getElementById('multimediaCount').innerHTML++;
		} else {
			$('#otherSize').html(formatNumber(getChartValue('otherSize') + mySize, 0));
			document.getElementById('otherCount').innerHTML++;
		}

		$('#totalFileSize').html(formatNumber(getChartValue('totalFileSize') + mySize, 0));
		document.getElementById('totalFileCount').innerHTML++;



		var totalFileCount   = getChartValue('totalFileCount');
		var totalFileSize    = getChartValue('totalFileSize');
		var totalFileSizeKB  = totalFileSize / 1024;
		consoleLog('setChartValue: totalFileSizeKB: ' + totalFileSizeKB);
		$("#dlTime56k").html(''+formatNumber((totalFileSizeKB / 7.168) + (totalFileCount * 0.02),2));
		$('#dlTime128k').html(formatNumber((totalFileSizeKB / 16.384) + (totalFileCount * 0.02),2));
		$('#dlTime640k').html(formatNumber((totalFileSizeKB / 80) + (totalFileCount * 0.02),2));
		$('#dlTime15Mbps').html(formatNumber((totalFileSizeKB / 192) + (totalFileCount * 0.02),2));
		$('#dlTime3Mbps').html(formatNumber((totalFileSizeKB / 375) + (totalFileCount * 0.02),2));
		$('#dlTime6Mbps').html(formatNumber((totalFileSizeKB / 750) + (totalFileCount * 0.02),2));

		consoleLog('Total File Count: ' + totalFileCount);
		//-- set the % --//
		if (totalFileCount > 0) {
			
			consoleLog('set the % ----------------------------------------------------------');

			$('#htmlPct').html(formatPercent((getValue('htmlSize') / totalFileSize),1));
			$('#cssPct').html(formatPercent((getValue('cssSize') / totalFileSize),1));
			$('#scriptPct').html(formatPercent((getValue('scriptSize') / totalFileSize),1));
			$('#xmlPct').html(formatPercent((getValue('xmlSize') / totalFileSize),1));
			$('#imgPct').html(formatPercent((getValue('imgSize') / totalFileSize),1));
			$('#cssImgPct').html(formatPercent((getValue('cssImgSize') / totalFileSize),1));
			$('#multimediaPct').html(formatPercent((getValue('multimediaSize') / totalFileSize),1));
			$('#otherPct').html(formatPercent((getValue('otherSize') / totalFileSize),1));
		}

	}

	function getValue(id) {
		myVal = $('#'+id).html();

		consoleLog(id);
		
		if (myVal == '') return 0;
		myVal = myVal.replace(/,/g,'');
		myVal = myVal *1;
		return myVal

	}

	function formatNumber(num,decimalNum)  {
		if (isNaN(parseInt(num))) return '0';

		var tmpNum = num;
		var iSign = num < 0 ? -1 : 1;		// Get sign of number

		// Adjust number so only the specified number of numbers after
		// the decimal point are shown.
		tmpNum *= Math.pow(10,decimalNum);
		tmpNum = Math.round(Math.abs(tmpNum))
		tmpNum /= Math.pow(10,decimalNum);
		tmpNum *= iSign;					// Readjust for sign


		// Create a string object to do our formatting on
		var tmpNumStr = new String(tmpNum);


		// See if we need to put in the commas
		if (num >= 1000 || num <= -1000) {
			var iStart = tmpNumStr.indexOf(".");
			if (iStart < 0)
				iStart = tmpNumStr.length;

			iStart -= 3;
			while (iStart >= 1) {
				tmpNumStr = tmpNumStr.substring(0,iStart) + "," + tmpNumStr.substring(iStart,tmpNumStr.length)
				iStart -= 3;
			}
		}

		return tmpNumStr.toString();		// Return our formatted string!
	}

	function formatPercent(num, decimalNum) {
		if (isNaN(parseInt(num))) return 0;

		num *= 100;
		num *= Math.pow(10, decimalNum);
		num = Math.round(num);
		if (num > 0) {
			num += '';
			num = num.substring(0, num.length-decimalNum) + '.' + num.substring(num.length-decimalNum);
		} else {
			num = '0.0';
		}

		return num + '%';

	}


	function consoleLog(val) {
		
	}

