<span id="imgTeste"></span>
<div id="pedidoCompra_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="pedidoCompra.instance()">

    <div class="panel-body">
        <div class="col-md-12 title">
            <img src="https://www.ccab-agro.com.br/wp-content/uploads/2018/09/logo_ccab.png" class="imagen"> &nbsp;
            <h1>
				<b><span class="fluigicon fluigicon-process fluigicon-md"></span> Aprovação Pedido de Compra</b>
			</h1>
        </div>
    </div>
    <span id="pedidoAprovado"></span>
    <div id='divPedidoCompra_${instanceId}' class="" style="display: block">
        <fieldset>
            <div class="panel panel-primary">
                <div class="panel-heading tituloPainel">
                    <h3 class="panel-title text-center">
						<strong id="tituloPedido_${instanceId}">Pedidos de Compra</strong>
					</h3>
                </div>
                <div class="panel-body">
                    <div class="form-group row fs-overflow-x-auto">
                        <div class="">
                            <table class="table" id="tabPedidos_${instanceId}" style="width:100%">
                                <thead>
                                    <tr>
                                        <th class="text-center">PEDIDO</th>
                                        <th class="text-center">SOLICITANTE</th>
                                        <th class="text-center hidden">_classname</th>
                                        <th class="text-center hidden">CODCENTROCUSTO</th>
                                        <th class="text-center">CENTROCUSTO</th>
                                        <th class="text-center hidden">CODFORNECEDOR</th>
                                        <th class="text-center">FORNECEDOR</th>
                                        <th class="text-center hidden">CODPRODUTO</th>
                                        <th class="text-center">FILIAL</th>
                                        <th class="text-center hidden">ITEM</th>
                                        <th class="text-center hidden">LOJAFORNECEDOR</th>
                                        <th class="text-center hidden">NIVEL</th>
                                        <th class="text-center hidden">OBS</th>
                                        <th class="text-center hidden">PRODUTO</th>
                                        <th class="text-center">TOTAL R$</th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody id="pedidos_${instanceId}" class="tabela">
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th class="text-center">PEDIDO</th>
                                        <th class="text-center">SOLICITANTE</th>
                                        <th class="text-center hidden">_classname</th>
                                        <th class="text-center hidden">CODCENTROCUSTO</th>
                                        <th class="text-center">CENTROCUSTO</th>
                                        <th class="text-center hidden">CODFORNECEDOR</th>
                                        <th class="text-center">FORNECEDOR</th>
                                        <th class="text-center hidden">CODPRODUTO</th>
                                        <th class="text-center">FILIAL</th>
                                        <th class="text-center hidden">ITEM</th>
                                        <th class="text-center hidden">LOJAFORNECEDOR</th>
                                        <th class="text-center hidden">NIVEL</th>
                                        <th class="text-center hidden">OBS</th>
                                        <th class="text-center hidden">PRODUTO</th>
                                        <th class="text-center">TOTAL R$</th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>

 <!-- PREENCHE TODOS OS DADOS DO PEDIDO NA DATATABLE -->
<script type="text/template" id="tpl-pedidos_${instanceId}">
    <tr class='text-center' style="cursor:default" onMouseOver="javascript:this.style.backgroundColor='#87CEEB'" onMouseOut="javascript:this.style.backgroundColor=''">
        <td id='pedidosPEDIDO_${instanceId}___{{linha}}' class=''>{{PEDIDO}}</td>
        <td id='pedidosSOLICITANTE_${instanceId}___{{linha}}' class=''>{{SOLICITANTE}}</td>
        <td id='pedidosClassName_${instanceId}___{{linha}}' class='hidden'>{{_classname}}</td>
        <td id='pedidosCODCENTROCUSTO_${instanceId}___{{linha}}' class='hidden'>{{CODCENTROCUSTO}}</td>
        <td id='pedidosCENTROCUSTO_${instanceId}___{{linha}}' class=''>{{CENTROCUSTO}}</td>
        <td id='pedidosCODFORNECEDOR_${instanceId}___{{linha}}' class='hidden'>{{CODFORNECEDOR}}</td>
        <td id='pedidosFORNECEDOR_${instanceId}___{{linha}}' class=''>{{FORNECEDOR}}</td>
        <td id='pedidosCODPRODUTO_${instanceId}___{{linha}}' class='hidden'>{{CODPRODUTO}}</td>
        <td id='pedidosFILIAL_${instanceId}___{{linha}}' class=''>{{FILIAL}}</td>
        <td id='pedidosITEM_${instanceId}___{{linha}}' class='hidden'>{{ITEM}}</td>
        <td id='pedidosLOJAFORNECEDOR_${instanceId}___{{linha}}' class='hidden'>{{LOJAFORNECEDOR}}</td>
        <td id='pedidosNIVEL_${instanceId}___{{linha}}' class='hidden'>{{NIVEL}}</td>
        <td id='pedidosOBS_${instanceId}___{{linha}}' class='hidden'>{{OBS}}</td>
        <td id='pedidosPRODUTO_${instanceId}___{{linha}}' class='hidden'>{{PRODUTO}}</td>
        <td id='pedidosTOTAL_${instanceId}___{{linha}}' class=''>{{TOTAL}}</td>
        <td>
            <button id='btnAprovar_${instanceId}___{{linha}}' type="button" class="btn btn-success" data-btnAprova onclick="pedidoAprovado('pedidosCODCENTROCUSTO_${instanceId}___{{linha}}','pedidosPEDIDO_${instanceId}___{{linha}}','pedidosFILIAL_${instanceId}___{{linha}}');">Aprovar</button>
        </td>
        <td>
            <button id='btnReprovar_${instanceId}___{{linha}}' type="button" class="btn btn-danger" data-btnReprovado onclick="pedidoReprovado('pedidosCODCENTROCUSTO_${instanceId}___{{linha}}','pedidosPEDIDO_${instanceId}___{{linha}}','pedidosFILIAL_${instanceId}___{{linha}}')">Reprovar</button>
        </td>
        <td>
            <button id='btnDetalhar_${instanceId}___{{linha}}' data-toggle="modal" data-target="#exampleModal" onclick="pedidoDetalhar('pedidosCENTROCUSTO_${instanceId}___{{linha}}','pedidosPEDIDO_${instanceId}___{{linha}}','{{linha}}')" type="button" class="btn btn-primary" data-btnDetalhar>Detalhar</button>
        </td>
    </tr>
    <tr>
        <td colspan="12">
            <span id='painelDetalhes_{{linha}}' style="display:none"></span>
        </td>
    </tr>
</script>

<!-- Modal -->
<div>
    <div class="form-group">
        <div id="myModal" class="modal">
            <div class="modal-content__">
                <span class="close">&times;</span>
                <div class="container__">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <span id="criticaReprovacao"></span>
                            <h1>Reprovar Pedido</h1>
                            <p>Você tem certeza que deseja reprovar o pedido? Informe uma justificativa.</p>
                            <div class="col-md-12 col-sm-12 col-lg-12">
                                <textarea  name="obsPedido" id="justificativa" cols="35" rows="5" class="form-control"></textarea>
                            </div>
                            <div class="clearfix">
                                <div style="margin-top: 20px; padding-left: 1.5%;">
                                    <button type="button" class="cancelbtn" onclick="cancelarReprovacao()">Cancelar</button>
                                </div>
                                <div style="margin-top: 20px;">
                                    <button type="button" class="deletebtn" onclick="confirmarReprovacao()">Reprovar</button>
                                </div>                                                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
</script>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<link type="text/css" rel="stylesheet" href="http://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
<script type="text/javascript" src="http://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>