(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
	var myProxy = 'https://cors-anywhere.herokuapp.com/'

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        // Events Information (Shows Gameweek Info)
        var eventcols = [{
            id: 'id',
            alias: 'event_id',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'name',
            alias: 'event_name',
            dataType: tableau.dataTypeEnum.string,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'deadline_time',
            alias: 'deadline_time',
            dataType: tableau.dataTypeEnum.datetime,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'average_entry_score',
            alias: 'average_entry_score',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'finished',
            alias: 'event_finished',
            dataType: tableau.dataTypeEnum.bool,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'data_checked',
            alias: 'data_checked',
            dataType: tableau.dataTypeEnum.bool,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'highest_scoring_entry',
            alias: 'highest_scoring_entry',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'deadline_time_epoch',
            alias: 'deadline_time_epoch',
            dataType: tableau.dataTypeEnum.datetime,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'deadline_time_game_offset',
            alias: 'deadline_time_game_offset',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'highest_score',
            alias: 'highest_score',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'is_previous',
            alias: 'is_previous',
            dataType: tableau.dataTypeEnum.bool,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'is_current',
            alias: 'is_current',
            dataType: tableau.dataTypeEnum.bool,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'is_next',
            alias: 'is_next',
            dataType: tableau.dataTypeEnum.bool,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'most_selected',
            alias: 'most_selected',
            dataType: tableau.dataTypeEnum.datetime,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'most_transferred_in',
            alias: 'most_transferred_in',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'top_element',
            alias: 'top_element',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'transfers_made',
            alias: 'transfers_made',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'most_captained',
            alias: 'most_captained',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'most_vice_captained',
            alias: 'most_vice_captained',
            dataType: tableau.dataTypeEnum.int
        }];

        // Phases Information (Shows Month start and end gameweeks)
        var phasecols = [{
            id: 'id',
            alias: 'phase_id',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'name',
            alias: 'month',
            dataType: tableau.dataTypeEnum.string,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'start_event',
            alias: 'start_event',
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: 'stop_event',
            alias: 'stop_event',
            dataType: tableau.dataTypeEnum.int
        }];

        // Fixture Information
        var fixturecols = [{
            id: 'id',
            alias: 'fixture_id',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'code',
            alias: 'fixture_code',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'event',
            alias: 'event_id',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'provisional_start_time',
            alias: 'provisional_start_time',
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: 'started',
            alias: 'started',
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: 'kickoff_time',
            alias: 'kickoff_time',
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: 'finished_provisional',
            alias: 'finished_provisional',
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: 'finished',
            alias: 'finished',
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: 'minutes',
            alias: 'minutes',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'team_h',
            alias: 'team_h',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'team_h_score',
            alias: 'team_h_score',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'team_h_difficulty',
            alias: 'team_h_difficulty',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'team_a',
            alias: 'team_a',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'team_a_score',
            alias: 'team_a_score',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'team_a_difficulty',
            alias: 'team_a_difficulty',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }];

        

        // Table Information
        var eventTableInfo = {
            id: 'eventinfo',
            alias: 'event information',
            columns: eventcols
        };
        var phasesTableInfo = {
            id: 'phasesinfo',
            alias: 'phases information',
            columns: phasecols
        };
        var fixtureTableInfo = {
            id: 'fixtureinfo',
            alias: 'fixture information',
            columns: fixturecols
        };
            

        schemaCallback([eventTableInfo, phasesTableInfo, fixtureTableInfo]);
    };
    
    // Download the data
    myConnector.getData = function(table, doneCallback) {
        var tableData = [];
        // get event information data
        if (table.tableInfo.id == 'eventinfo') {
            $.getJSON(myProxy + 'https://fantasy.premierleague.com/api/bootstrap-static/', function(resp) {
                for (var i = 0, len = resp.events.length; i < len; i++) {
                    tableData.push({
                        'id': resp.events[i].id,
                        'name': resp.events[i].name,
                        'deadline_time': resp.events[i].deadline_time,
                        'average_entry_score': resp.events[i].average_entry_score,
                        'finished': resp.events[i].finished,
                        'data_checked': resp.events[i].data_checked,
                        'highest_scoring_entry': resp.events[i].highest_scoring_entry,
                        'deadline_time_epoch': resp.events[i].deadline_time_epoch,
                        'deadline_time_game_offset': resp.events[i].deadline_time_game_offset,
                        'highest_score': resp.events[i].highest_score,
                        'is_previous': resp.events[i].is_previous,
                        'is_current': resp.events[i].is_current,
                        'is_next': resp.events[i].is_next,
						'most_selected': resp.events[i].most_selected,
                        'most_transferred_in': resp.events[i].most_transferred_in,
                        'top_element': resp.events[i].top_element,
                        'transfers_made': resp.events[i].transfers_made,
						'most_captained': resp.events[i].most_captained,
						'most_vice_captained': resp.events[i].most_vice_captained,
                    });
                }
                table.appendRows(tableData);
                doneCallback();
            });
        }

        // get phases information data
        if (table.tableInfo.id == 'phasesinfo') {
            $.getJSON(myProxy + 'https://fantasy.premierleague.com/api/bootstrap-static/', function(resp) {
                for (var i = 0, len = resp.phases.length; i < len; i++) {
                    tableData.push({
                        'id': resp.phases[i].id,
                        'name': resp.phases[i].name,
                        'start_event': resp.phases[i].start_event,
                        'stop_event': resp.phases[i].stop_event,
                    });
                }
                table.appendRows(tableData);
                doneCallback();
            });
        }
     
        // get fixture information data
        if (table.tableInfo.id == 'fixtureinfo') {
            $.getJSON(myProxy + 'https://fantasy.premierleague.com/api/fixtures/', function(resp) {
                for (var i = 0, len = resp.length; i < len; i++) {
                    tableData.push({
                        'id': resp[i].id,
                        'code': resp[i].code,
                        'event': resp[i].event,
                        'provisional_start_time': resp[i].provisional_start_time,
                        'started': resp[i].started,
                        'kickoff_time': resp[i].kickoff_time,
                        'finished_provisional': resp[i].finished_provisional,
                        'finished': resp[i].finished,
                        'minutes': resp[i].minutes,
                        'team_h': resp[i].team_h,
                        'team_h_score': resp[i].team_h_score,
                        'team_h_difficulty': resp[i].team_h_difficulty,
                        'team_a': resp[i].team_a,
                        'team_a_score': resp[i].team_a_score,
						'team_a_difficulty': resp[i].team_a_difficulty,	
                    });
                }
                table.appendRows(tableData);
                doneCallback();
            });
        } 

    }
        
    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $('#submitButton').click(function() {
            tableau.connectionName = 'FPL 2019-20 Gameweek Details'; // This will be the data source name in Tableau
            $.getJSON(myProxy + 'https://fantasy.premierleague.com/api/bootstrap-static/', function(resp) {
				//resp.toJSON();
                tableau.connectionData = resp.elements.length.toString();
                tableau.submit(); // This sends the connector object to Tableau
            });
        });
    });
})();