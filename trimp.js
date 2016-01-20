	ShowTooltips=true;
	AutoFuckingBuy=false;
	ConsoleLog=true;
	DoForm=true;
	HeapFirst=true;
	curCell = 0;

	AutoBuyStorage=function () {
		if (!document.getElementById("chkBuyStorage")) {
			document.getElementById("resourceColumn").innerHTML += '<input id="chkBuyStorage" style="left: 50%; top: 50%; position: absolute;" type="checkbox" checked>';
		}
		return document.getElementById("chkBuyStorage").checked;
	}
	AutoBuyStorage();

	AutoBuyBuilding=function () {
		if (!document.getElementById("chkBuyBuilding")) {
			document.getElementById("buildingsTitleSpan").outerHTML += '<input id="chkBuyBuilding" type="checkbox" checked>';
		}
		return document.getElementById("chkBuyBuilding").checked;
	}
	
	AutoBuyUpgrades=function () {
		if (!document.getElementById("chkBuyUpgrades")) {
			document.getElementById("upgradesTitleSpan").outerHTML += '<input id="chkBuyUpgrades" type="checkbox" checked>';
		}
		return document.getElementById("chkBuyUpgrades").checked;
	}

	AutoBuyEquipH=function () {
		if (!document.getElementById("chkBuyEquipH")) {
			document.getElementById("equipmentTitleSpan").innerHTML += '<table><tr><td><input id="chkBuyEquipH" type="checkbox" checked><input id="chkBuyEquipA" type="checkbox" checked></td></tr><tr><td><input id="chkBuyPrestigeH" type="checkbox" checked><input id="chkBuyPrestigeA" type="checkbox" checked></td></tr></table>';
		}
		return document.getElementById("chkBuyEquipH").checked;
	}

	AutoBuyPrestigeH=function () {
		if (!document.getElementById("chkBuyPrestigeH")) {
			document.getElementById("equipmentTitleSpan").innerHTML += '<table><tr><td><input id="chkBuyEquipH" type="checkbox" checked><input id="chkBuyEquipA" type="checkbox" checked></td></tr><tr><td><input id="chkBuyPrestigeH" type="checkbox" checked><input id="chkBuyPrestigeA" type="checkbox" checked></td></tr></table>';
		}
		return document.getElementById("chkBuyPrestigeH").checked;
	}

	AutoBuyEquipA=function () {
		if (!document.getElementById("chkBuyEquipA")) {
			document.getElementById("equipmentTitleSpan").innerHTML += '<table><tr><td><input id="chkBuyEquipH" type="checkbox" checked><input id="chkBuyEquipA" type="checkbox" checked></td></tr><tr><td><input id="chkBuyPrestigeH" type="checkbox" checked><input id="chkBuyPrestigeA" type="checkbox" checked></td></tr></table>';
		}
		return document.getElementById("chkBuyEquipA").checked;
	}

	AutoBuyPrestigeA=function () {
		if (!document.getElementById("chkBuyPrestigeA")) {
			document.getElementById("equipmentTitleSpan").innerHTML += '<table><tr><td><input id="chkBuyEquipH" type="checkbox" checked><input id="chkBuyEquipA" type="checkbox" checked></td></tr><tr><td><input id="chkBuyPrestigeH" type="checkbox" checked><input id="chkBuyPrestigeA" type="checkbox" checked></td></tr></table>';
		}
		return document.getElementById("chkBuyPrestigeA").checked;
	}

	AutoBuyJobs=(function () { 
		return function() {
			if (!document.getElementById("chkBuyJobs")) {
				document.getElementById("jobsTitleSpan").innerHTML += '<input id="chkBuyJobs" type="checkbox" checked>';
			}
			return document.getElementById("chkBuyJobs").checked; 
		};
	})();

	OldTooltip=tooltip;

	tooltip=function(a,b,c,d,e,f,g,h,i,j,k,l,m) {
		if (ShowTooltips || a=='hide') {
			OldTooltip(a,b,c,d,e,f,g,h,i,j,k,l,m);
		}
	}

	BuyDaBuilding=function(what) {
		ShowTooltips=false;
		buyBuilding(what);
		ShowTooltips=true;
	}

	BuyDaEquip=function(what) {
		ShowTooltips=false;
		buyEquipment(what);
		ShowTooltips=true;
	}

	BuyDaUpgrade=function(what) {
		ShowTooltips=false;
		buyUpgrade(what);
		ShowTooltips=true;
	}

	TheThings={
		'Dagger':{
			Upgrade: 'Dagadder',
			Stat:'attack',
			Resource:'metal',
			Equip:true
		},
		'Mace':{
			Upgrade: 'Megamace',
			Stat:'attack',
			Resource:'metal',
			Equip:true
		},
		'Polearm':{
			Upgrade: 'Polierarm',
			Stat:'attack',
			Resource:'metal',
			Equip:true
		},
		'Battleaxe':{
			Upgrade: 'Axeidic',
			Stat:'attack',
			Resource:'metal',
			Equip:true
		},
		'Greatsword':{
			Upgrade: 'Greatersword',
			Stat:'attack',
			Resource:'metal',
			Equip:true
		},
		'Arbalest':{
			Upgrade: 'Harmbalest',
			Stat:'attack',
			Resource:'metal',
			Equip:true
		},
		'Boots':{
			Upgrade: 'Bootboost',
			Stat:'health',
			Resource:'metal',
			Equip:true
		},
		'Helmet':{
			Upgrade: 'Hellishmet',
			Stat:'health',
			Resource:'metal',
			Equip:true
		},
		'Pants':{
			Upgrade: 'Pantastic',
			Stat:'health',
			Resource:'metal',
			Equip:true
		},
		'Shoulderguards':{
			Upgrade: 'Smoldershoulder',
			Stat:'health',
			Resource:'metal',
			Equip:true
		},
		'Breastplate':{
			Upgrade: 'Bestplate',
			Stat:'health',
			Resource:'metal',
			Equip:true
		},
		'Gambeson':{
			Upgrade: 'GambesOP',
			Stat:'health',
			Resource:'metal',
			Equip:true
		},
		'Shield':{		
			Upgrade: 'Supershield',
			Stat:'health',
			Resource:'wood',
			Equip:true
		},
		'Gym':{
			Upgrade: 'Gymystic',
			Stat:'block',
			Resource:'wood',
			Equip:false
		}
	}

	function GetObject(what) {
		var Thing=TheThings[what];
		return Thing.Equip ? game.equipment[what] : game.buildings[what];
	}

	function Factor(what) {
		var Thing=TheThings[what];
		var Object=GetObject(what);
		if (what=='Shield') {
			if (Object.blockNow) {
				Thing.Stat='block';
			}
			else {
				Thing.Stat='health';
			}
		}

		var Eff=Effect(Object,Thing);
		var Cos=Cost(Object,Thing);
		var Res=Eff/Cos;
		var Status='white';
		var Wall=false;

	        //white - Upgrade is not available
	        //yellow - Upgrade is not affordable
	        //orange - Upgrade is affordable, but will lower stats
	        //red - Yes, do it now!
	        if (!game.upgrades[Thing.Upgrade].locked) {
	                //Evaluating upgrade!
	                var CanAfford=canAffordTwoLevel(game.upgrades[Thing.Upgrade]);
	                if (Thing.Equip) {
	                	var NextEff=PrestigeValue(Thing.Upgrade);
	                	var NextCost=getNextPrestigeCost(Thing.Upgrade) * Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level);
	                	Wall=NextEff/NextCost>Res;
	                }

	                if (!CanAfford) {
	                	Status='yellow';
	                }
	                else {
	                	if (!Thing.Equip) {
	                                //Gymystic is always cool, fuck shield
	                                Status='red';
	                            }
	                            else {
	                            	var CurrEff=Object.level*Eff;

	                            	var NeedLevel=Math.ceil(CurrEff/NextEff);
	                            	var Ratio=Object.cost[Thing.Resource][1];

	                            	var NeedResource=NextCost*(Math.pow(Ratio,NeedLevel)-1)/(Ratio-1);

	                            	if (game.resources[Thing.Resource].owned>NeedResource) {
	                            		Status='red';
	                            	}
	                            	else {
	                            		Status='orange';
	                            	}
	                            }
	                        }
	                    }

	                    return {
	                    	Stat:Thing.Stat,
	                    	Factor:Res,
	                    	Status:Status,
	                    	Wall:Wall
	                    };
	                }

	                function Effect(Object,Thing) {
	                	if (Thing.Equip) {
	                		return Object[Thing.Stat+'Calculated'];
	                	}
	                	else {
	                //That be Gym
	                var oldBlock = Object.increase.by*Object.owned;
	                var Mod=game.upgrades.Gymystic.done?(game.upgrades.Gymystic.modifier + (0.01 * (game.upgrades.Gymystic.done - 1))):1;
	                var newBlock=Object.increase.by*(Object.owned+1)*Mod;
	                return newBlock-oldBlock;
	            }
	        }

	        function Cost(Object,Thing) {
	        	var price = parseFloat(getBuildingItemPrice(Object, Thing.Resource, Thing.Equip));
	        	if (Thing.Equip) price = Math.ceil(price * (Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level)));
	        	return price;
	        }

	        function PrestigeValue(what) {
	        	var name = game.upgrades[what].prestiges;
	        	var equipment = game.equipment[name];
	        	var stat;

	        	if (equipment.blockNow) {
	        		stat = "block";
	        	}
	        	else {
	        		stat = (typeof equipment.health !== 'undefined') ? "health" : "attack";
	        	}

	        	var toReturn = Math.round(equipment[stat] * Math.pow(1.19, ((equipment.prestige) * game.global.prestige[stat]) + 1));
	        	return toReturn;
	        }


	        function EvalAll() {
	        	var Best={
	        		'healthwood':{Factor:0,Name:'',Wall:false,Status:'white'},
	        		'healthmetal':{Factor:0,Name:'',Wall:false,Status:'white'},
	        		'attackmetal':{Factor:0,Name:'',Wall:false,Status:'white'},
	        		'blockwood':{Factor:0,Name:'',Wall:false,Status:'white'},
	        	};

	        	for (var what in TheThings) {

	        		var Object=GetObject(what);

	        		if (!Object.locked) {
	        			document.getElementById(what).style.color='white';
	        			var Evaluation=Factor(what);
	        			var BKey=TheThings[what].Stat+TheThings[what].Resource;
	                        if (Best[BKey].Factor==0 || Best[BKey].Factor<Evaluation.Factor) {
	                        	Best[BKey].Factor=Evaluation.Factor;
	                        	Best[BKey].Name=what;
	                        	Best[BKey].Wall=Evaluation.Wall;
	                        	Best[BKey].Status=Evaluation.Status;
	                        }
	                        document.getElementById(what).style.borderColor=Evaluation.Status;
	                        if (Evaluation.Status!='white' && Evaluation.Status!='yellow') {                              
	                        	document.getElementById(TheThings[what].Upgrade).style.color=Evaluation.Status;
	                        }
	                        if (Evaluation.Status=='yellow') {
	                        	document.getElementById(TheThings[what].Upgrade).style.color='white';
	                        }
	                        if (Evaluation.Wall) {
	                        	document.getElementById(what).style.color='yellow';
	                        }

	                        if (
	                        	Evaluation.Status=='red'
	                        	&&
	                        	(
	                        		(
	                        			AutoBuyPrestigeA()
	                        			&&
	                        			TheThings[what].Stat=='attack'
	                        			)
	                        		||
	                        		(
	                        			AutoBuyPrestigeH()
	                        			&&
	                        			(
	                        				TheThings[what].Stat=='health'
	                        				||
	                        				TheThings[what].Stat=='block'
	                        				)
	                        			)
	                        		)
	                        	) 
							{	//Then
								var upgrade = TheThings[what].Upgrade;
								message('Wanna do upgrade '+upgrade, "Notices");
								BuyDaUpgrade(upgrade);
							}
						}
					}

					for (var stat in Best) {
						if (Best[stat].Name!='') {
							var DaThing=TheThings[Best[stat].Name];
							document.getElementById(Best[stat].Name).style.color=Best[stat].Wall?'orange':'red';
							if (
								(
									AutoBuyEquipA()
									&&
									DaThing.Stat=='attack'
									)
								||
								(
									AutoBuyEquipH()
									&&
									(
										DaThing.Stat=='health'
										||
										DaThing.Stat=='block'
										)
									)
								)
							{
								if (DaThing.Equip && !Best[stat].Wall && canAffordBuilding(Best[stat].Name, null, null, true)) {
									message('Wanna level equip '+Best[stat].Name, "Notices");

									BuyDaEquip(Best[stat].Name);
								}
							}
						}
					}      
				}

				setInterval('EvalAll()',250);

				Builder={
					Buys: {},
					Start: function(what, counter)
					{
						this.Buys[what]=setInterval(function() {
							if (what=='Warpstation') { 
								if (AutoBuyBuilding() && !game.buildings[what].locked && canAffordBuilding(what)) {
									message('Wanna buy '+what, "Notices");
									console.log(what + " - " +parseInt(game.buildings[what].owned+1)); // instead of parseInt? Learn unary plus
									BuyDaBuilding(what);
								}
								else if (
										(
											(counter!=null && game.buildings[what].owned>=counter)
											||
											game.upgrades.Gigastation.allowed-game.upgrades.Gigastation.done>=50
										)
										&&
										AutoBuyUpgrades()
										&&
										!game.upgrades.Gigastation.locked
									)
								{                                      
									if (canAffordTwoLevel(game.upgrades.Gigastation))
									{
										var upgrade = 'Gigastation';
										message('Wanna do upgrade '+upgrade, "Notices");
										BuyDaUpgrade(upgrade);
									}                                              
								}
							}
							else if (AutoBuyBuilding() && !game.buildings[what].locked && canAffordBuilding(what)) {
								if (counter==null || game.buildings[what].purchased<counter) {
									if (what=='Collector') {
										var Coll=game.buildings.Collector;
										var Warp=game.buildings.Warpstation;
										if (!Warp.locked) {
											CollGemCost=Coll.cost.gems[0]*Math.pow(Coll.cost.gems[1],Coll.purchased);
											CollEffect=Coll.increase.by/CollGemCost;

											WarpGemCost=Warp.cost.gems[0]*Math.pow(Warp.cost.gems[1],Warp.purchased);
											WarpEffect=Warp.increase.by/WarpGemCost;
										}
										if (Warp.locked || CollEffect>WarpEffect) {
											message('Wanna buy '+what, "Notices");
											BuyDaBuilding(what);
										}
									}
	                                        //else if (what!='Nursery' || game.buildings.Collector.locked || game.buildings.Collector.purchased>=game.buildings.Nursery.purchased/10) // Special cases FTW
	                                        else if (what!='Nursery' || Math.floor(game.resources.gems.owned/50) > Math.floor(400000*Math.pow(1.06, game.buildings.Nursery.owned)) ) {
	                                        	message('Wanna buy '+what, "Notices");
	                                        	BuyDaBuilding(what);
	                                        }
	                                    }
	                                }
	                            },1000);
},
Stop: function(what) {
	if (this.Buys[what]) {
		clearInterval(this.Buys[what]);
		delete this.Buys[what];
	}
}
}

setInterval(function() {
	var packMod = 1+game.portal.Packrat.level * game.portal.Packrat.modifier;
	var Bs={'Barn':'food','Shed':'wood','Forge':'metal'};
	for (var B in Bs)
	{
		if (game.resources[Bs[B]].owned>game.resources[Bs[B]].max*packMod*0.8)
		{
			if (AutoBuyStorage() && canAffordBuilding(B))
			{
				message('Wanna buy '+B, "Notices");

				BuyDaBuilding(B);
			}
		}
	}
},
1000);

setInterval(function() {
	var Us=[
	'Coordination',
	'Speedminer',
	'Speedlumber',
	'Speedfarming',
	'Speedscience',
	'Megaminer',
	'Megalumber',
	'Megafarming',
	'Megascience',
	'Efficiency',
	'Potency',
	'TrainTacular',
	'Blockmaster',
	'Explorers',
	'Egg',
	'Bloodlust',
	'Miners',
	'Scientists',
	'Trainers',
	'Trapstorm',
	'UberHut',
	'UberHouse',
	'UberMansion',
	'UberHotel',
	'UberResort',
	'Formations',
	'Bounty',
	'Battle',
	'Anger',
	'Dominance',
	'Barrier'         
	];
	for (var U in Us) {
		var name=Us[U];
		var up=game.upgrades[Us[U]];

		if (AutoBuyUpgrades() && up.allowed>up.done && canAffordTwoLevel(up)) {
			if (name!='Coordination') {
				message('Wanna read '+name, "Notices");
			}
			BuyDaUpgrade(name);
		}
	}

	var cellNum;
	var cell;

	if (game.global.mapsActive) {
		cellNum = game.global.lastClearedMapCell + 1;
		cell = game.global.mapGridArray[cellNum];
	} else {
		cellNum = game.global.lastClearedCell + 1;
		cell = game.global.gridArray[cellNum];
	}

	var badGuyDMG = calculateDamage(cell.attack); 
	var goodGuyHP = game.global.soldierHealthMax;

	        if (curCell != cellNum) { // If curCell has changed

	        	if (DoForm) {
	        		if (!game.upgrades.Dominance.done) {setFormation('1');}
		       		if (game.badGuys[cell.name].fast) { // Fast
		       			if (game.upgrades.Dominance.done) { setFormation('2'); } // Dominance
		       			if (badGuyDMG * 1.75 > goodGuyHP) { // Can almost 1 hit us so heap
		       				setFormation('1'); // Back to Heap
		       			}
		       		}
		       		else { // Not Fast
		       			if (game.upgrades.Dominance.done) { setFormation('2'); } // Dominance
		       			//if ((game.upgrades.Barrier.done) && (!HeapFirst) ) setFormation('3'); //Barrier
		       		}
		       	} 
		      	curCell = cellNum;

		    }

	        // show % map bonus earned in map screen
	        if (game.global.mapsActive) {
	        	if (typeof(game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)]) !== 'undefined') {
	        		var mapLVL = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].level;
	        		document.getElementById("worldNumber").innerHTML = "</br>Lv: " + mapLVL + " - " + game.global.mapBonus*20 + "%";
	        	}
	        }


	    },
	    1000);

	Builder.Start('Hut',80)
	Builder.Start('House',80)
	Builder.Start('Gym')
	Builder.Start('Mansion',80)
	Builder.Start('Hotel',80)
	Builder.Start('Resort',80)
	Builder.Start('Gateway',24)
	Builder.Start('Wormhole',24)
	Builder.Start('Collector')
	Builder.Start('Warpstation',200)
	Builder.Start('Tribute')
	Builder.Start('Nursery')



	function MaxWorkers() {
		return Math.ceil(game.resources.trimps.realMax() / 2);
	}

	function FreeWorkers() {
		return MaxWorkers()-game.resources.trimps.employed;
	}

	function canAffordJobLight(what, take, HowMany) {
		var trimps = game.resources.trimps;
		var toBuy = HowMany;
		var job = game.jobs[what];
		for (var costItem in job.cost) {
			if (!checkJobItem(what, take, costItem, null, toBuy)) return false;
		}
		if (take) 
			return toBuy;

		return true;
	}

	function TryAddGuys(what, HowMany) {
		var workspaces = FreeWorkers();
		if (workspaces < HowMany) return;
		if (!canAffordJobLight(what, false, HowMany)) return 0;
		var added = canAffordJobLight(what, true, HowMany);
		game.jobs[what].owned += added;
		game.resources.trimps.employed += added;
		return added;
	}

	TheJobs=[
	{
		Name:'Explorer',
		Want:1,
		Buffer:0,
		Increase:function(want){return 5;}
	},
	{
		Name:'Trainer',
		Want:1,
		Buffer:0,
		Increase:function(want){return 5;}
	},
	        // {
	        //         Name:'Geneticist',
	        //         Want:1,
	        //         Buffer:0,
	        //         Increase:function(want){return game.jobs.Geneticist.owned<game.buildings.Nursery.owned/3?1:0;}
	        // },
	        {
	        	Name:'Miner',
	        	Want:0.333,
	        	Buffer:23,
	        	Increase:function(want){return Math.ceil(want/10);}
	        },
	        {
	        	Name:'Farmer',
	        	Want:0.333,
	        	Buffer:21,
	        	Increase:function(want){return Math.ceil(want/10);}
	        },
	        {
	        	Name:'Lumberjack',
	        	Want:0.333,
	        	Buffer:22,
	        	Increase:function(want){return Math.ceil(want/10);}
	        },
	        {
	        	Name:'Scientist',
	        	Want:0.01,
	        	Buffer:20,
	        	Increase:function(want){
	        		return Math.ceil((Math.min(200000,game.jobs.Lumberjack.owned)-game.jobs.Scientist.owned)/10);
	        	}
	        }
	        ];

	        function JobsTime() {
	        	var MaxW=MaxWorkers();
	        	var FreeW=FreeWorkers();
	        	for (var TJ in TheJobs) {
	        		var TheJob=TheJobs[TJ];
	        		if (!game.jobs[TheJob.Name].locked && AutoBuyJobs()) {
	        			var Target=Math.floor((MaxW-TheJob.Buffer)*TheJob.Want);
	        			var Want=Math.min(FreeW-TheJob.Buffer,TheJob.Increase(Math.min(FreeW-TheJob.Buffer, Target-game.jobs[TheJob.Name].owned)));
	        			if (Want>0) {
	        				var added=TryAddGuys(TheJob.Name,Want);
	        				if (added>0) {
	        					FreeW-=added;
	        				}
	        			}
	        		}
	        	}
	        }

	        setInterval('JobsTime()',1000);

(function (originalFunction) {
  updatePortalTimer = function () {
    var result = originalFunction.call(this); 
	document.title = "Trimps - " +document.getElementById("portalTimer").innerHTML.slice(3);
  };  
}(updatePortalTimer));


// (function mog() {
// 	alert("Mog");
// 	setTimeout(mog, 600000/2);
// }());
