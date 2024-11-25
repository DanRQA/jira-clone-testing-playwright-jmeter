/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 90.68596601636249, "KoPercent": 9.314033983637508};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4418502202643172, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8248366013071895, 500, 1500, "Login To View Projects-0"], "isController": false}, {"data": [0.24509803921568626, 500, 1500, "Login To View Projects-1"], "isController": false}, {"data": [0.6415730337078651, 500, 1500, "New Project Id Found-1"], "isController": false}, {"data": [0.19426336375488917, 500, 1500, "Visit Login Page"], "isController": false}, {"data": [0.19258373205741627, 500, 1500, "Create New Todo In Project"], "isController": false}, {"data": [0.7236842105263158, 500, 1500, "Delete Project Created-1"], "isController": false}, {"data": [0.15294117647058825, 500, 1500, "Login To View Projects"], "isController": false}, {"data": [0.7921348314606742, 500, 1500, "New Project Id Found-0"], "isController": false}, {"data": [0.2684069611780455, 500, 1500, "New Project Id Found"], "isController": false}, {"data": [0.9210526315789473, 500, 1500, "Delete Project Created-0"], "isController": false}, {"data": [0.302, 500, 1500, "Create Project For Current User"], "isController": false}, {"data": [0.766, 500, 1500, "Create Project For Current User-0"], "isController": false}, {"data": [0.6424418604651163, 500, 1500, "Create New Todo In Project-1"], "isController": false}, {"data": [0.12341772151898735, 500, 1500, "Delete Project Created"], "isController": false}, {"data": [0.482, 500, 1500, "Create Project For Current User-1"], "isController": false}, {"data": [0.8837209302325582, 500, 1500, "Create New Todo In Project-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 7945, 740, 9.314033983637508, 1249.0122089364438, 76, 6313, 964.0, 2737.0, 3187.0, 3951.0, 13.206712899858374, 166.99210795791723, 8.822473421386398], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Login To View Projects-0", 765, 0, 0.0, 427.13333333333316, 76, 1049, 422.0, 678.1999999999999, 751.0, 887.4000000000003, 1.2749851251735398, 0.44076634210100885, 0.5503353762956099], "isController": false}, {"data": ["Login To View Projects-1", 765, 0, 0.0, 1703.460130718956, 92, 3985, 1719.0, 2749.7999999999997, 2962.3999999999987, 3482.4400000000023, 1.2722350092465708, 34.90432193771786, 0.631147836618416], "isController": false}, {"data": ["New Project Id Found-1", 445, 22, 4.943820224719101, 739.3955056179778, 88, 3328, 507.0, 1734.6000000000001, 2080.5999999999995, 2579.78, 0.7515495431592103, 6.0597557754260185, 0.40439824050852036], "isController": false}, {"data": ["Visit Login Page", 767, 0, 0.0, 2103.344198174707, 116, 6313, 1987.0, 3551.000000000001, 3918.399999999997, 4940.479999999998, 1.2763974638464994, 5.366104572128106, 0.4537194109766854], "isController": false}, {"data": ["Create New Todo In Project", 418, 260, 62.20095693779904, 1283.2751196172244, 148, 5615, 1128.5, 2327.100000000001, 2856.199999999996, 3523.7300000000005, 0.7170180283719574, 2.7007513787158857, 0.7525379200473438], "isController": false}, {"data": ["Delete Project Created-1", 38, 0, 0.0, 624.1315789473686, 109, 2168, 459.0, 1486.7000000000003, 1881.0999999999992, 2168.0, 0.06602311504006561, 1.7219287197944249, 0.03275365472690754], "isController": false}, {"data": ["Login To View Projects", 765, 0, 0.0, 2130.802614379084, 168, 4609, 2187.0, 3323.4, 3646.0, 4004.02, 1.272010774679503, 35.33790806448596, 1.1800881210405547], "isController": false}, {"data": ["New Project Id Found-0", 445, 0, 0.0, 502.85168539325826, 78, 2846, 376.0, 1049.2, 1269.8, 1688.6200000000001, 0.7522495642869097, 0.14912759917015886, 0.4003671997425447], "isController": false}, {"data": ["New Project Id Found", 747, 324, 43.373493975903614, 1329.6559571619803, 114, 4697, 1135.0, 2658.8, 3110.400000000001, 3868.199999999999, 1.2613257597503689, 6.515695495783761, 1.0756246422444506], "isController": false}, {"data": ["Delete Project Created-0", 38, 0, 0.0, 322.7894736842106, 108, 919, 275.0, 594.2000000000002, 780.2999999999996, 919.0, 0.06615886833514689, 0.010337323177366704, 0.042253808487486395], "isController": false}, {"data": ["Create Project For Current User", 750, 0, 0.0, 1697.4866666666685, 183, 5660, 1530.0, 3271.2999999999997, 3769.249999999997, 4392.710000000001, 1.2562435303458186, 34.84958754122572, 1.3948719667999958], "isController": false}, {"data": ["Create Project For Current User-0", 750, 0, 0.0, 530.3559999999995, 98, 2995, 456.0, 928.8, 1057.8999999999985, 1695.330000000001, 1.2581106197956156, 0.19657978434306497, 0.7728042771986742], "isController": false}, {"data": ["Create New Todo In Project-1", 172, 14, 8.13953488372093, 649.2383720930231, 83, 2145, 534.0, 1357.0000000000014, 1671.85, 2145.0, 0.2989661333945171, 2.418938977666187, 0.16086947216833877], "isController": false}, {"data": ["Delete Project Created", 158, 120, 75.9493670886076, 1311.26582278481, 115, 3587, 1164.0, 2505.1999999999994, 2936.35, 3506.1699999999996, 0.2738591081552816, 2.7503923183386805, 0.20758124992416876], "isController": false}, {"data": ["Create Project For Current User-1", 750, 0, 0.0, 1167.0119999999997, 84, 3871, 1022.0, 2379.0, 2842.45, 3414.49, 1.2565676603045248, 34.662240568517284, 0.6233753627291979], "isController": false}, {"data": ["Create New Todo In Project-0", 172, 0, 0.0, 387.9883720930233, 104, 1345, 314.5, 718.3000000000002, 916.9999999999998, 1294.6300000000008, 0.29956389070794615, 0.05938620098995416, 0.24807634699251788], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 740, 100.0, 9.314033983637508], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 7945, 740, "500/Internal Server Error", 740, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["New Project Id Found-1", 445, 22, "500/Internal Server Error", 22, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Create New Todo In Project", 418, 260, "500/Internal Server Error", 260, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["New Project Id Found", 747, 324, "500/Internal Server Error", 324, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Create New Todo In Project-1", 172, 14, "500/Internal Server Error", 14, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Delete Project Created", 158, 120, "500/Internal Server Error", 120, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
