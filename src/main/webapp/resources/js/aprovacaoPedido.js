var arrPedidos = [];
var constraint;
var pedidoReprovado_;
var centrocustoReprovado_;
var filial_;
var loading;

//ARMAZENA LOGIN DO USUARIO LOGADO
var usuario = WCMAPI.getUserCode();

//Customiza campo valores em REAL
function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

//BTN CANCELA MODAL
function cancelarReprovacao()
{
    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function confirmarReprovacao() {

    var modal = document.getElementById("myModal");

    let obs = document.getElementById("justificativa").value;

    let divCritica = document.querySelector("#criticaReprovacao");
    divCritica.innerHTML = "";
    let divAlerta = document.createElement("div");

    if (obs.length == 0) {
        divAlerta.innerHTML = "";
        divAlerta.className = "alert alert-danger";
        divAlerta.setAttribute("role","alert");
        divAlerta.innerHTML = "Você precisa preencher uma Justificativa!";

        divCritica.append(divAlerta);

        //CUSTOMIZA ALERTA CAMPO JUSTIFICATIVA
        divCritica.setAttribute("style","font-size: 18px; text-align: center;");

        //TIMOUT ALERTA CAMPO JUSTIFICATIVA
        setTimeout(() => {
            divCritica.innerHTML = "";
        }, 3000);

    } else {
        ativaLoading();
        setTimeout(() => {
            let obj = {
                'filial': filial_,
                'pedido': pedidoReprovado_,
                'centrocusto': centrocustoReprovado_,
                'usuario': constraint[0]._initialValue,
                'status': "rejeitado",
                'obs': obs
            }
    
            //CONSTRAINT ENVIANDO OS DADOS DE REJEIÇÂO
            var c1 = DatasetFactory.createConstraint("filial", JSON.stringify(obj), JSON.stringify(obj), ConstraintType.MUST);
    
            var constraintsFilhos = new Array(c1);
    
            //RECEBIMENTO DA RESPOSTA DA API 
            var datasetFilhos = new Promise(resolve => {
                //ativaLoading();
                var pm =  DatasetFactory.getDataset("ds_sendRespAprovador", null, constraintsFilhos, null);
                
                resolve(pm);
            });   
    
            datasetFilhos.then(res =>{
                pedidoReprovado_ = "";
                centrocustoReprovado_ = "";
                modal.style.display = "none";

                let divAlerta = document.createElement("div");
                let divAprovacao = document.querySelector("#pedidoAprovado");
    
                divAprovacao.innerHTML = "";
                divAlerta.innerHTML = "";
                divAlerta.className = "alert alert-success";
                divAlerta.setAttribute("role","alert");
            
                divAlerta.innerHTML = "Pedido Reprovado com sucesso!"
                               
                document.getElementById("imgTeste").scrollIntoView({
                    behavior:'smooth'
                });
                
                divAlerta.setAttribute("style","font-size: 18px; text-align: center; font-weight: bold;");
    
                divAprovacao.append(divAlerta);
    
                desativaLoading();
    
                setTimeout(() => {
                    divAprovacao.innerHTML = "";
                    window.location.href = window.location.href;
                }, 3000);
            }).catch(err =>{
                console.log(err);
                divAlerta.innerHTML = "";
                divAlerta.className = "alert alert-danger";
                divAlerta.setAttribute("role","alert");
                //DIGITA A MENSAGEM DE ERRO QUANDO NÃO HOUVER COMUNICAÇÃO COM A API
                divAlerta.innerHTML = "Houve um erro de comunicação com o servidor, contate o administrador do sistema!";
        
                divCritica.append(divAlerta);
                //TIMOUT ALERTA CAMPO JUSTIFICATIVA
                setTimeout(() => {
                    divCritica.innerHTML = "";
                }, 4000);
            });
        }, 3000);
        
    }
}

function pedidoReprovado(centrocusto, pedido, filial) {
    pedido = document.querySelector("#" + pedido).textContent;
    centrocusto = document.querySelector("#" + centrocusto).textContent;
    filial = document.querySelector("#" + filial).textContent;

    pedidoReprovado_ = pedido;
    centrocustoReprovado_ = centrocusto;
    filial_ = filial;

    let obs = document.getElementById("justificativa").value = "";

    // Get the modal
    var modal = document.getElementById("myModal")
    modal.style.display = "block";

}
 
//Mostra Loading pedido aprovado
function ativaLoading(){
    loading.show();
}

//Desativa Loading quando a aprovação é concluida
function desativaLoading(){
    loading.hide();
}

//Envia dados de pedido aprovado
function pedidoAprovado(centrocusto, pedido, filial) {

    ativaLoading();
    setTimeout(() => {
        pedido = document.querySelector("#" + pedido).textContent;
        centrocusto = document.querySelector("#" + centrocusto).textContent;
        filial = document.querySelector("#" + filial).textContent;

        let obj = {
            'filial': filial,
            'pedido': pedido,
            'centrocusto': centrocusto,
            'usuario': constraint[0]._initialValue,
            'status': "aprovado",
            'obs': ""
        }

        //CONSTRAINT ENVIANDO OS DADOS APROVAÇÂO
        var c1 = DatasetFactory.createConstraint("filial", JSON.stringify(obj), JSON.stringify(obj), ConstraintType.MUST);

        var constraintsFilhos = new Array(c1);

        //RECEBIMENTO DA RESPOSTA DA API 
        var datasetFilhos = new Promise(resolve => {
            //ativaLoading();
            var pm =  DatasetFactory.getDataset("ds_sendRespAprovador", null, constraintsFilhos, null);
            resolve(pm);
        });    

        let divAlerta = document.createElement("div");
        let divAprovacao = document.querySelector("#pedidoAprovado");

        datasetFilhos.then(res =>{
            divAprovacao.innerHTML = "";
            divAlerta.innerHTML = "";
            divAlerta.className = "alert alert-success";
            divAlerta.setAttribute("role","alert");
            divAlerta.innerHTML = "Pedido Aprovado com sucesso!"
                        
            document.getElementById("imgTeste").scrollIntoView({
                behavior:'smooth'
            }); 

            desativaLoading();

            //CUSTOMIZAÇÃO ALERTA DE PEDIDO APROVADO
            divAlerta.setAttribute("style","font-size: 18px; text-align: center; font-weight: bold;");
            divAprovacao.append(divAlerta);
            setTimeout(() => {
                divAprovacao.innerHTML = "";
                window.location.href = window.location.href;
            }, 4000);
        }).catch(err =>{
            console.log(err);
            divAprovacao.innerHTML = "";
            divAlerta.innerHTML = "";
            divAlerta.className = "alert alert-danger";
            divAlerta.setAttribute("role","alert");
        
            divAlerta.innerHTML = "Houve um erro de comunicação com o servidor, contate o administrador do sistema!";

            //CUSTOMIZAÇÃO ALERTA DE PEDIDO APROVADO
            divAlerta.setAttribute("style","font-size: 18px; text-align: center; font-weight: bold;");
            divAprovacao.append(divAlerta);
            setTimeout(() => {
                divAprovacao.innerHTML = "";
                window.location.href = window.location.href;
            }, 4000);
        });
    }, 3000);
}

//Detalha os pedidos 
function pedidoDetalhar(centrocusto, pedido, linha) {

    linha = document.querySelector("#painelDetalhes_" + linha);
    pedido = document.querySelector("#" + pedido).textContent;
    centrocusto = document.querySelector("#" + centrocusto).textContent;

    var div = linha
    //var div = document.querySelector("#painelDetalhes")
    div.innerHTML = "";

    //APARECE E ESCONDE O PAINEL 
    if (div.style.display == "block")
        div.style.display = "none";
    else
        div.style.display = "block";

    //CRIAÇÃO DA DIV DO PAINEL    
    var divPanel = document.createElement("div");
    divPanel.className = "panel panel-default"

    //TITULO
    var divPH = document.createElement("div");
    divPH.className = "panel-heading"
    var titulo = document.createElement("h3");
    titulo.className = "panel-title"
    titulo.setAttribute("style", "text-align: center; font-weight: bold;")
    titulo.innerHTML = "Detalhe Completo do Pedido"
    divPH.append(titulo);

    divPanel.append(divPH);

    for (var i = 0; i < arrPedidos.length; i++) {
        if (arrPedidos[i].PEDIDO == pedido && arrPedidos[i].CENTROCUSTO == centrocusto) {

            //BODY PANEL 
            var divBody = document.createElement("div");
            divBody.className = "panel-body"
            divBody.setAttribute("style", "border: 1px solid gray;border-radius: 14px;padding: 14px;}")

            var formB = document.createElement("form");
            var row = document.createElement("div")
            row.className = "row"
            var row2 = document.createElement("div")
            row2.className = "row"
            var row3 = document.createElement("div")
            row3.className = "row"
            var row4 = document.createElement("div")
            row4.className = "row"

            //PEDIDO
            var divRowPedido = document.createElement("div");
            divRowPedido.className = "form-group col-md-1";
            var labelP = document.createElement("label");
            labelP.innerHTML = "Pedido:"
            var iptPedido = document.createElement("input");
            iptPedido.className = "form-control";
            iptPedido.setAttribute("type", "text");
            iptPedido.setAttribute("readonly", "");
            iptPedido.setAttribute("value", arrPedidos[i].PEDIDO);

            divRowPedido.append(labelP)
            divRowPedido.append(iptPedido);

            //SOLICITANTE
            var divRowSolicitante = document.createElement("div");
            divRowSolicitante.className = "form-group col-md-4";
            var labelSolicitante = document.createElement("label");
            labelSolicitante.innerHTML = "Solicitante:"
            var iptSolicitante = document.createElement("input");
            iptSolicitante.className = "form-control";
            iptSolicitante.setAttribute("type", "text");
            iptSolicitante.setAttribute("readonly", "");
            iptSolicitante.setAttribute("value", arrPedidos[i].SOLICITANTE);

            divRowSolicitante.append(labelSolicitante)
            divRowSolicitante.append(iptSolicitante);


            //Código Centro de Custo
            var divRowCodCC = document.createElement("div");
            divRowCodCC.className = "form-group col-md-2";
            var labelCodCC = document.createElement("label");
            labelCodCC.innerHTML = "Codigo Cent. Custo:"
            var iptCodCC = document.createElement("input");
            iptCodCC.className = "form-control";
            iptCodCC.setAttribute("type", "text");
            iptCodCC.setAttribute("readonly", "");
            iptCodCC.setAttribute("value", arrPedidos[i].CODCENTROCUSTO);

            divRowCodCC.append(labelCodCC)
            divRowCodCC.append(iptCodCC);

            //Centro de Custo:
            var divRowCC = document.createElement("div");
            divRowCC.className = "form-group col-md-4";
            var labelCC = document.createElement("label");
            labelCC.innerHTML = "Centro de Custo:"
            var iptCC = document.createElement("input");
            iptCC.className = "form-control";
            iptCC.setAttribute("type", "text");
            iptCC.setAttribute("readonly", "");
            iptCC.setAttribute("value", arrPedidos[i].CENTROCUSTO);

            divRowCC.append(labelCC)
            divRowCC.append(iptCC);

            //FILIAL:
            var divRowFilial = document.createElement("div");
            divRowFilial.className = "form-group col-md-1";
            var labelFilial = document.createElement("label");
            labelFilial.innerHTML = "Filial:"
            var iptFilial = document.createElement("input");
            iptFilial.className = "form-control";
            iptFilial.setAttribute("type", "text");
            iptFilial.setAttribute("readonly", "");
            iptFilial.setAttribute("value", arrPedidos[i].FILIAL);

            divRowFilial.append(labelFilial)
            divRowFilial.append(iptFilial);


            row.append(divRowPedido);
            row.append(divRowSolicitante);
            row.append(divRowCodCC);
            row.append(divRowCC);
            row.append(divRowFilial);

            //ITEM:
            var divRowItem = document.createElement("div");
            divRowItem.className = "form-group col-md-1";
            var labelItem = document.createElement("label");
            labelItem.innerHTML = "Item:"
            var iptItem = document.createElement("input");
            iptItem.className = "form-control";
            iptItem.setAttribute("type", "text");
            iptItem.setAttribute("readonly", "");
            iptItem.setAttribute("value", arrPedidos[i].ITEM);

            //CÓD PRODUTO
            var divRowCP = document.createElement("div");
            divRowCP.className = "form-group col-md-2";
            var labelCP = document.createElement("label");
            labelCP.innerHTML = "Cod. Produto:"
            var iptCP = document.createElement("input");
            iptCP.className = "form-control";
            iptCP.setAttribute("type", "text");
            iptCP.setAttribute("readonly", "");
            iptCP.setAttribute("value", arrPedidos[i].CODPRODUTO);

            //PRODUTO
            var divRowProduto = document.createElement("div");
            divRowProduto.className = "form-group col-md-3";
            var labelProduto = document.createElement("label");
            labelProduto.innerHTML = "Produto:"
            var iptProduto = document.createElement("input");
            iptProduto.className = "form-control";
            iptProduto.setAttribute("type", "text");
            iptProduto.setAttribute("readonly", "");
            iptProduto.setAttribute("value", arrPedidos[i].PRODUTO);

            //Cod. Fornecedor
            var divRowCF = document.createElement("div");
            divRowCF.className = "form-group col-md-2";
            var labelCF = document.createElement("label");
            labelCF.innerHTML = "Cod. Fornecedor:"
            var iptCF = document.createElement("input");
            iptCF.className = "form-control";
            iptCF.setAttribute("type", "text");
            iptCF.setAttribute("readonly", "");
            iptCF.setAttribute("value", arrPedidos[i].CODFORNECEDOR);

            //Fornecedor
            var divRowFornecedor = document.createElement("div");
            divRowFornecedor.className = "form-group col-md-4";
            var labelFornecedor = document.createElement("label");
            labelFornecedor.innerHTML = "Fornecedor:"
            var iptFornecedor = document.createElement("input");
            iptFornecedor.className = "form-control";
            iptFornecedor.setAttribute("type", "text");
            iptFornecedor.setAttribute("readonly", "");
            iptFornecedor.setAttribute("value", arrPedidos[i].FORNECEDOR);

            divRowItem.append(labelItem)
            divRowItem.append(iptItem);

            divRowCP.append(labelCP)
            divRowCP.append(iptCP);

            divRowFornecedor.append(labelFornecedor)
            divRowFornecedor.append(iptFornecedor);

            divRowCF.append(labelCF)
            divRowCF.append(iptCF);

            divRowProduto.append(labelProduto)
            divRowProduto.append(iptProduto);

            row2.append(divRowItem);
            row2.append(divRowCP);
            row2.append(divRowProduto);
            row2.append(divRowCF);
            row2.append(divRowFornecedor);

            //Loja Fornecedor
            var divRowLojaFornecedor = document.createElement("div");
            divRowLojaFornecedor.className = "form-group col-md-2";
            var labelLojaFornecedor = document.createElement("label");
            labelLojaFornecedor.innerHTML = "Loja Fornecedor:"
            var iptLojaFornecedor = document.createElement("input");
            iptLojaFornecedor.className = "form-control";
            iptLojaFornecedor.setAttribute("type", "text");
            iptLojaFornecedor.setAttribute("readonly", "");
            iptLojaFornecedor.setAttribute("value", arrPedidos[i].LOJAFORNECEDOR);

            divRowLojaFornecedor.append(labelLojaFornecedor)
            divRowLojaFornecedor.append(iptLojaFornecedor);

            row3.append(divRowLojaFornecedor);

            //Total
            var divRowTotal = document.createElement("div");
            divRowTotal.className = "form-group col-md-2";
            var labelTotal = document.createElement("label");
            labelTotal.innerHTML = "Total R$"
            var iptTotal = document.createElement("input");
            iptTotal.className = "form-control";
            iptTotal.setAttribute("type", "text");
            iptTotal.setAttribute("readonly", "");
            iptTotal.setAttribute("value", numberToReal(arrPedidos[i].TOTAL));

            divRowTotal.append(labelTotal)
            divRowTotal.append(iptTotal);

            row3.append(divRowTotal);

            //Obs
            var divRowOBS = document.createElement("div");
            divRowOBS.className = "form-group col-md-12";
            var labelOBS = document.createElement("label");
            labelOBS.innerHTML = "Obs:"
            var iptOBS = document.createElement("textarea");
            iptOBS.className = "form-control";
            iptOBS.setAttribute("readonly", "");
            iptOBS.value =  arrPedidos[i].OBS;

            divRowOBS.append(labelOBS)
            divRowOBS.append(iptOBS);

            row4.append(divRowOBS);

            formB.append(row);
            formB.append(row2);
            formB.append(row3);
            formB.append(row4);
            divBody.append(formB);

            divPanel.append(divBody);
        }
    }
    // divPanel.append(divBody);
    div.append(divPanel);

} ///LIMPAR A DIV PAINEL

var pedidoCompra = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    
    //método iniciado quando a widget é carregada
    init: function() {
        loading = FLUIGC.loading(window);
        window.exemple2= FLUIGC.loading();
    },
  
    //BIND de eventos
    bindings: {
        local: {
            //'execute': ['click_executeAction'],
        },
        global: {}
    },

    //executeAction: function(htmlElement, event) { 
    init: function(htmlElement, event) {          
    console.log("iniciado");
    var that = this; 
        loading = FLUIGC.loading(window);

    constraint = [DatasetFactory.createConstraint("userID", WCMAPI.getUserCode(), WCMAPI.getUserCode(), ConstraintType.MUST)];
    //constraint = [DatasetFactory.createConstraint("userID", 25171803854, 25171803854, ConstraintType.MUST)];

    var dataset = DatasetFactory.getDataset("ds_consultaAlcadaCompra", null, constraint, null);

    arrPedidos = [];
    $("#pedidos_"+that.instanceId)[0].innerHTML = "";

    if(dataset.values.length == 0)
    {
        let tb = document.querySelector("#pedidos_"+that.instanceId);
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.setAttribute("colspan","10");
        td.setAttribute("style","text-align:center; font-weight: bold; font-size: 18px;");
        td.innerHTML = "Não há pedidos para serem exibidos!";

        tr.append(td);
        tb.append(tr);
    }

    //PREENCHIMENTO DO ARRAY DE PEDIDOS PELO DATASET
    for (var i = 0; i < dataset.values.length; i++) {
        var pedidos = {};
        pedidos["linha"] = i + 1;
        pedidos["_classname"] = dataset.values[i]._classname;
        pedidos["CENTROCUSTO"] = dataset.values[i].CENTROCUSTO;
        pedidos["CODCENTROCUSTO"] = dataset.values[i].CODCENTROCUSTO.trim();
        pedidos["CODFORNECEDOR"] = dataset.values[i].CODFORNECEDOR;
        pedidos["CODPRODUTO"] = dataset.values[i].CODPRODUTO;
        pedidos["FILIAL"] = dataset.values[i].FILIAL;
        pedidos["FORNECEDOR"] = dataset.values[i].FORNECEDOR;
        pedidos["ITEM"] = dataset.values[i].ITEM;
        pedidos["LOJAFORNECEDOR"] = dataset.values[i].LOJAFORNECEDOR;
        pedidos["NIVEL"] = dataset.values[i].NIVEL;
        pedidos["OBS"] = dataset.values[i].OBS;
        pedidos["PEDIDO"] = dataset.values[i].PEDIDO.trim();
        pedidos["PRODUTO"] = dataset.values[i].PRODUTO;
        pedidos["SOLICITANTE"] = dataset.values[i].SOLICITANTE;
        pedidos["TOTAL"] = dataset.values[i].TOTAL;
        arrPedidos.push(pedidos);
    }

    var pedidosResposta = [];

    //PREENCHIMENTO DO ARRAY PARA SEPARAR OS PEDIDOS
    for (var i = 0; i < arrPedidos.length; i++) {
        if (pedidosResposta.indexOf(arrPedidos[i].PEDIDO) == -1) {
            pedidosResposta.push(arrPedidos[i].PEDIDO)
        }
    }

    var pedidoComCentro = [];
    var centroDeCustos = [];
    var outrasInformacoes = [];
    for (var i = 0; i < pedidosResposta.length; i++) {
        centroDeCustos = [];
        valorTotal = 0;
        for (var j = 0; j < arrPedidos.length; j++) {

            //PREENCHENDO O ARRAY POR PEDIDO
            if (pedidosResposta[i] == arrPedidos[j].PEDIDO) {
                //SEPERANDO O CENTRO DE CUSTO DE CADA PEDIDO
                if (centroDeCustos.indexOf(arrPedidos[j].CENTROCUSTO) == -1) {
                    centroDeCustos.push(arrPedidos[j].CENTROCUSTO)
                        //CAPTURANDO AS OUTRAS INFORMAÇÕES DO PEDIDO  
                    outrasInformacoes.push({
                        CODCENTROCUSTO: arrPedidos[j].CODCENTROCUSTO,
                        CODFORNECEDOR: arrPedidos[j].CODFORNECEDOR,
                        CODPRODUTO: arrPedidos[j].CODPRODUTO,
                        FILIAL: arrPedidos[j].FILIAL,
                        FORNECEDOR: arrPedidos[j].FORNECEDOR,
                        ITEM: arrPedidos[j].ITEM,
                        LOJAFORNECEDOR: arrPedidos[j].LOJAFORNECEDOR,
                        NIVEL: arrPedidos[j].NIVEL,
                        OBS: arrPedidos[j].OBS,
                        PRODUTO: arrPedidos[j].PRODUTO,
                        SOLICITANTE: arrPedidos[j].SOLICITANTE
                    })
                }

            }
        }
        //INSERINDO O CENTROCUSTO DOS PEDIDOS
        pedidoComCentro.push({ centroDeCustos: centroDeCustos, pedidos: pedidosResposta[i] })
        centroDeCustos = [];
    }

    var totalValor = [];
    var valorPorCentro = 0;
    var valorTotal = 0;
    var objCompleto = [];

    for (var i = 0; i < pedidoComCentro.length; i++) {

        //LOOPING DOS CENTROCUSTO DOS PEDIDOS
        for (var y = 0; y < pedidoComCentro[i].centroDeCustos.length; y++) {
            for (var j = 0; j < arrPedidos.length; j++) {
                if (arrPedidos[j].CENTROCUSTO == pedidoComCentro[i].centroDeCustos[y] && arrPedidos[j].PEDIDO == pedidoComCentro[i].pedidos) 
                {
                    //SOMA DO VALOR TOTAL POR CENTRO
                    valorTotal += arrPedidos[j].TOTAL
                }

            }

            totalValor.push({ centroDeCustos: pedidoComCentro[i].centroDeCustos[y], total: numberToReal(valorTotal) });

            valorTotal = 0;
        }

        objCompleto.push({
            pedido: pedidoComCentro[i].pedidos,
            centroDeCustos: totalValor,
            informacoes: outrasInformacoes[i]
        })

        totalValor = []

    }

    for (var i = 0; i <= objCompleto.length; i++) {
        for (var j = 0; j < objCompleto[i].centroDeCustos.length; j++) {
            that.appendValue("tpl-pedidos_" + that.instanceId, {
                    linha: i + 1,
                    _classname: dataset.values[i]._classname,
                    CENTROCUSTO: objCompleto[i].centroDeCustos[j].centroDeCustos,
                    CODCENTROCUSTO: objCompleto[i].informacoes.CODCENTROCUSTO,
                    CODFORNECEDOR: objCompleto[i].informacoes.CODFORNECEDOR,
                    CODPRODUTO: objCompleto[i].informacoes.CODPRODUTO,
                    FILIAL: objCompleto[i].informacoes.FILIAL,
                    FORNECEDOR: objCompleto[i].informacoes.FORNECEDOR,
                    ITEM: objCompleto[i].informacoes.ITEM,
                    LOJAFORNECEDOR: objCompleto[i].informacoes.LOJAFORNECEDOR,
                    NIVEL: objCompleto[i].informacoes.NIVEL,
                    OBS: objCompleto[i].informacoes.OBS,
                    PEDIDO: objCompleto[i].pedido,
                    PRODUTO: objCompleto[i].informacoes.PRODUTO,
                    SOLICITANTE: objCompleto[i].informacoes.SOLICITANTE,
                    TOTAL: objCompleto[i].centroDeCustos[j].total
                },
                "pedidos_" + that.instanceId
            );
        }
    }

    $('#tabPedidos_' + that.instanceId).DataTable();
    }
    ,
    appendValue : function (template, data, element) {
    	
    	var tpl = $("#"+template).html(),
	    view = data;
		html = Mustache.render(tpl, view);
		$("#"+element).append(html);
    }
});

