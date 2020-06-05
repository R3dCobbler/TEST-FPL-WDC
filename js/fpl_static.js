(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
	var myProxy = 'https://cors-anywhere.herokuapp.com/'

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        
        // Team Information 
        var teamcols = [{
            id: 'id',
            alias: 'team_id',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'name',
            alias: 'Team Name',
            dataType: tableau.dataTypeEnum.string
        }, {
            id: 'short_name',
            alias: 'Short Name',
            dataType: tableau.dataTypeEnum.string
        }, {
            id: 'code',
            alias: 'team_code',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'unavailable',
            alias: 'unavailable',
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: 'position',
            alias: 'position',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'played',
            alias: 'played',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'win',
            alias: 'win',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'loss',
            alias: 'loss',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'draw',
            alias: 'draw',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'points',
            alias: 'points',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'form',
            alias: 'form',
            dataType: tableau.dataTypeEnum.string,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'team_division',
            alias: 'team_division',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'strength',
            alias: 'strength',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'strength_overall_home',
            alias: 'strength_overall_home',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'strength_overall_away',
            alias: 'strength_overall_away',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'strength_attack_home',
            alias: 'strength_attack_home',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'strength_attack_away',
            alias: 'strength_attack_away',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'strength_defence_home',
            alias: 'strength_defence_home',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'strength_defence_away',
            alias: 'strength_defence_away',
            dataType: tableau.dataTypeEnum.int
        }];

         
        // Player Information 
        var playercols = [{
            id: 'id',
            alias: 'player_id',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'first_name',
            alias: 'first_name',
            dataType: tableau.dataTypeEnum.string
        }, {
            id: 'second_name',
            alias: 'second_name',
            dataType: tableau.dataTypeEnum.string
        }, {
            id: 'full_name',
            alias: 'Full Name',
            dataType: tableau.dataTypeEnum.string,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'team',
            alias: 'team_id',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'team_code',
            alias: 'team_code',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'status',
            alias: 'status',
            dataType: tableau.dataTypeEnum.string,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'photo',
            alias: 'photo',
            dataType: tableau.dataTypeEnum.string
        }, {
            id: 'web_name',
            alias: 'web_name',
            dataType: tableau.dataTypeEnum.string,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'squad_number',
            alias: 'squad_number',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'code',
            alias: 'code',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'element_type',
            alias: 'element_type',
            dataType: tableau.dataTypeEnum.int,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'position',
            alias: 'Position',
            dataType: tableau.dataTypeEnum.string,
            columnRole: tableau.columnRoleEnum.dimension
        }, {
            id: 'form',
            alias: 'Form',
            dataType: tableau.dataTypeEnum.string
        }, {
            id: 'total_points',
            alias: 'Total Points',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'minutes',
            alias: 'Minutes',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'goals_scored',
            alias: 'goals_scored',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'assists',
            alias: 'assists',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'clean_sheets',
            alias: 'clean_sheets',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'goals_conceded',
            alias: 'goals_conceded',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'own_goals',
            alias: 'own_goals',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'penalties_saved',
            alias: 'penalties_saved',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'penalties_missed',
            alias: 'penalties_missed',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'yellow_cards',
            alias: 'yellow_cards',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'red_cards',
            alias: 'red_cards',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'saves',
            alias: 'saves',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'bonus',
            alias: 'bonus',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'bps',
            alias: 'bps',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'influence',
            alias: 'influence',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'creativity',
            alias: 'creativity',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'threat',
            alias: 'threat',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'ict_index',
            alias: 'ict_index',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'selected_by_percent',
            alias: 'selected_by_percent',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'now_cost',
            alias: 'now_cost',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'points_per_game',
            alias: 'points_per_game',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'event_points',
            alias: 'Event Points',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'ep_this',
            alias: 'ep_this',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'ep_next',
            alias: 'ep_next',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'chance_of_playing_this_round',
            alias: 'chance_of_playing_this_round',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'chance_of_playing_next_round',
            alias: 'chance_of_playing_next_round',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'in_dreamteam',
            alias: 'in_dreamteam',
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: 'dreamteam_count',
            alias: 'dreamteam_count',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'transfers_in',
            alias: 'transfers_in',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'transfers_in_event',
            alias: 'transfers_in_event',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'transfers_out',
            alias: 'transfers_out',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'transfers_out_event',
            alias: 'transfers_out_event',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'value_form',
            alias: 'value_form',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'value_season',
            alias: 'value_season',
            dataType: tableau.dataTypeEnum.float
        }, {
            id: 'cost_change_event',
            alias: 'cost_change_event',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'cost_change_event_fall',
            alias: 'cost_change_event_fall',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'cost_change_start',
            alias: 'cost_change_start',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'cost_change_start_fall',
            alias: 'cost_change_start_fall',
            dataType: tableau.dataTypeEnum.int
        }, {
            id: 'special',
            alias: 'special',
            dataType: tableau.dataTypeEnum.string
        }, {
            id: 'news_added',
            alias: 'news_added',
            dataType: tableau.dataTypeEnum.string
        }, {
            id: 'news',
            alias: 'news',
            dataType: tableau.dataTypeEnum.string
        }];

        // Table Information
        var teamTableInfo = {
            id: 'teaminfo',
            alias: 'team information',
            columns: teamcols
        };
        var playerTableInfo = {
            id: 'playerinfo',
            alias: 'player information',
            columns: playercols
        };
        
        schemaCallback([teamTableInfo, playerTableInfo]);
    };


    // Convert element_type to Position in Player Information table
    function getPosition(id) {
        var position = '';
        switch (id) {
            case 1:
                position = 'Goalkeeper';
                break;
            case 2:
                position = 'Defender';
                break;
            case 3:
                position = 'Midfielder';
                break;
            case 4:
                position = 'Forward';
                break;
        }
        return position;
    }
    
    // Download the data
    myConnector.getData = function(table, doneCallback) {
        var tableData = [];
    
        // get team information data
        if (table.tableInfo.id == 'teaminfo') {
            $.getJSON(myProxy + 'https://fantasy.premierleague.com/api/bootstrap-static/', function(resp) {
                for (var i = 0, len = resp.teams.length; i < len; i++) {
                    tableData.push({
                        'id': resp.teams[i].id,
                        'name': resp.teams[i].name,
                        'short_name': resp.teams[i].short_name,
                        'team_code': resp.teams[i].code,
                        'unavailable': resp.teams[i].unavailable,
                        'position': resp.teams[i].position,                
                        'played': resp.teams[i].played,
                        'win': resp.teams[i].win,
                        'loss': resp.teams[i].loss,
                        'draw': resp.teams[i].draw,
                        'points': resp.teams[i].points,
                        'form': resp.teams[i].form,
                        'team_division': resp.teams[i].team_division,
                        'strength': resp.teams[i].strength,
                        'strength_overall_home': resp.teams[i].strength_overall_home,
                        'strength_overall_away': resp.teams[i].strength_overall_away,
                        'strength_attack_home': resp.teams[i].strength_attack_home,
                        'strength_attack_away': resp.teams[i].strength_attack_away,
                        'strength_defence_home': resp.teams[i].strength_defence_home,
                        'strength_defence_away': resp.teams[i].strength_defence_away,
                    });                     
                }
                table.appendRows(tableData);
                doneCallback();
            });
        }

        // get player information data
        if (table.tableInfo.id === 'playerinfo') {
            $.getJSON(myProxy + 'https://fantasy.premierleague.com/api/bootstrap-static/', function(resp) {
                for (var i = 0, len = resp.elements.length; i < len; i++) {
                    if (resp.elements[i].id <= 1000) {
                        var position = getPosition(resp.elements[i].element_type);
                    tableData.push({
                        'id': resp.elements[i].id,
                        'first_name': resp.elements[i].first_name,
                        'second_name': resp.elements[i].second_name,
                        'team': resp.elements[i].team,
                        'team_code': resp.elements[i].team_code,
                        'status': resp.elements[i].status,                 
                        'photo': resp.elements[i].code + '.png',
                        'web_name': resp.elements[i].web_name,
                        'squad_number': resp.elements[i].squad_number,
                        'code': resp.elements[i].code,
                        'element_type': resp.elements[i].element_type,
                        'form': resp.elements[i].form,
                        'total_points': resp.elements[i].total_points,
                        'minutes': resp.elements[i].minutes,
                        'goals_scored': resp.elements[i].goals_scored,
                        'assists': resp.elements[i].assists,
                        'clean_sheets': resp.elements[i].clean_sheets,
                        'goals_conceded': resp.elements[i].goals_conceded,
                        'own_goals': resp.elements[i].own_goals,
                        'penalties_saved': resp.elements[i].penalties_saved,
                        'penalties_missed': resp.elements[i].penalties_missed,
                        'yellow_cards': resp.elements[i].yellow_cards,
                        'red_cards': resp.elements[i].red_cards,
                        'saves': resp.elements[i].saves,
                        'bonus': resp.elements[i].bonus,
                        'bps': resp.elements[i].bps,                     
                        'influence': resp.elements[i].influence,
                        'creativity': resp.elements[i].creativity,
                        'threat': resp.elements[i].threat,
                        'ict_index': resp.elements[i].ict_index,
                        'selected_by_percent': resp.elements[i].selected_by_percent,
                        'now_cost': resp.elements[i].now_cost,
                        'points_per_game': resp.elements[i].points_per_game,
                        'event_points': resp.elements[i].event_points,
                        'ep_this': resp.elements[i].ep_this,
                        'ep_next': resp.elements[i].ep_next,
                        'chance_of_playing_this_round': resp.elements[i].chance_of_playing_this_round,
                        'chance_of_playing_next_round': resp.elements[i].chance_of_playing_next_round,
                        'in_dreamteam': resp.elements[i].in_dreamteam,
                        'dreamteam_count': resp.elements[i].dreamteam_count,
                        'transfers_in': resp.elements[i].transfers_in,
                        'transfers_in_event': resp.elements[i].transfers_in_event,
                        'transfers_out': resp.elements[i].transfers_out,
                        'transfers_out_event': resp.elements[i].transfers_out_event,
                        'value_form': resp.elements[i].value_form,
                        'value_season': resp.elements[i].value_season,     
                        'cost_change_event': resp.elements[i].cost_change_event,
                        'cost_change_event_fall': resp.elements[i].cost_change_event_fall,
                        'cost_change_start': resp.elements[i].cost_change_start,
                        'cost_change_start_fall': resp.elements[i].cost_change_start_fall,
                        'special': resp.elements[i].special,
                        'news_added': resp.elements[i].news_added,
                        'news': resp.elements[i].news,
                        'position': position,
                        'full_name': resp.elements[i].first_name + ' ' + resp.elements[i].second_name
                    });                     
                    }
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
            tableau.connectionName = 'FPL 2019-20 Player and Team Stats'; // This will be the data source name in Tableau
            $.getJSON(myProxy + 'https://fantasy.premierleague.com/api/bootstrap-static/', function(resp) {
				//resp.toJSON();
                tableau.connectionData = resp.elements.length.toString();
                tableau.submit(); // This sends the connector object to Tableau
            });
        });
    });
})();