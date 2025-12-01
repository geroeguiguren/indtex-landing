 function obtenerCAE(){
                if (confirm("Se generara el Comprobante Electronico.\n\n\u00BFDesea Continuar?")){
                    //obtenemos uno por uno los valores que le vamos a enviar a afip
                    cuitVendedor = 30525978172;
                    puntoDeVenta = $("#codigo").val();
                    tipoComprobante = $("#tipo").val();
                    nroComprobante = "0";
                    from = $("#fecha").val().split("/");
                    fechaEmision = from[2]+from[1]+from[0];
                    from = $("#vencimiento").val().split("/");
                    fechaVenc = from[2]+from[1]+from[0];
                    from = $("#serv_desde").val().split("/");
                    fechaServicioDesde = from[2]+from[1]+from[0];
                    from = $("#serv_hasta").val().split("/");
                    fechaServicioHasta = from[2]+from[1]+from[0];
                    codigoConcepto = "2";
                    tipoDocComprador = $("#tipo_doc").val();
                    nroDocComprador = $("#nro_doc").val();
                    importeTotalBase = Number($("#importeTotal").val().replace(",","."));
                    arrayCodigosIva = "";
                    arrayBaseImpIva = importeTotalBase;
                    arrayImporteIva = "0";
                    //actualizamos el importe total ya que puede ser que la suma no de exacto por los decimales y afip da error
                    //importeTotalBase = (Number(arrayBaseImpIva)+Number(arrayImporteIva)).toFixed(2); esto hay que usar si
                    //la suma difiere mucho, lo cual no creo pero por las dudas dejo el codigo
                    totalNetoGravado = arrayBaseImpIva;
                    totalNetoNoGravado = "0";
                    totalExento = "0";
                    totalIVA = arrayImporteIva;
                    totalFactura = String(importeTotalBase);
                    nombre = $("#nombre").val();
                    domicilio = $("#domicilio").val();
                    localidad = $("#localidad").val();
                    observaciones = $("#observaciones").val();                   
                    sDatosFac = cuitVendedor+"|"+puntoDeVenta+"|"+tipoComprobante+"|"+nroComprobante+"|"+fechaEmision+"|"+
                        fechaVenc+"|"+fechaServicioDesde+"|"+fechaServicioHasta+"|"+codigoConcepto+"|"+tipoDocComprador+"|"+
                        nroDocComprador+"|"+arrayCodigosIva+"|"+arrayBaseImpIva+"|"+arrayImporteIva+"|"+totalNetoGravado+"|"+
                        totalNetoNoGravado+"|"+totalExento+"|"+totalIVA+"|"+totalFactura;
                    var rand = Math.random();

                    $.ajax({ url: "REDSOCIAL.AVVA_FE.INSERTA_COMPROBANTE",
                        type: "POST",
                        data: {
                            pnPuntoVenta : puntoDeVenta,
                            pnTipoComprobante : tipoComprobante,
                            pnCodigoConcepto : codigoConcepto,
                            pdFechaEmision : fechaEmision,
                            pdFechaVenc : fechaVenc,
                            pdFechaServicioDesde : fechaServicioDesde,
                            pdFechaServicioHasta : fechaServicioHasta,
                            pnTipoDocComprador : tipoDocComprador,
                            pnNroDocComprador : nroDocComprador,
                            pnCodigoIva : arrayCodigosIva,
                            pnBaseImpIva : arrayBaseImpIva,
                            pnImporteIva : arrayImporteIva,
                            pnNetoGravado : totalNetoGravado,
                            pnNetoNoGravado : totalNetoNoGravado,
                            pnExento : totalExento,
                            pnIVA : totalIVA,
                            pnTotalFactura : totalFactura,
                            psDescripcion: nombre,
                            psDomicilio: domicilio,
                            pnLocalidad: localidad,
                            psObservaciones: observaciones,
                            pnCodComprobanteAsociado: "",
                            pnRandom: rand
                        },
                        async: true,
                        dataType:"json"
                        
                    }).done(function (codigoComprobante){
                    
                        //una ver cargado en base correctamente los datos, procedemos a enviarselos a afip
                        if (codigoComprobante != "" && parseInt(codigoComprobante,10) > 0) {
                            $.ajax({
                                //url: "http://localhost:62884/WebService.asmx/obtenerCAE",
                                url: "http://200.123.152.92:9999/webServiceAFIP/webService.asmx/obtenerCAE",
                                type: "POST",
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                data: "datosFac=" + sDatosFac,
                                dataType: "jsonp",
                                success: function (json) {
                                    procesarRespuesta(json, codigoComprobante);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    alert("Hubo un error al validar los datos del comprobante en AFIP\n\n"+xhr.status+"\n"+thrownError);
                                }
                            });
                        } else {
                            alert("Hubo un error en la carga de los datos antes de enviar a afip para generar el CAE.");
                        }
                    });
                }
            }