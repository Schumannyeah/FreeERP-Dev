/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// The only required parameter is "productionRunId".

import org.apache.ofbiz.entity.GenericValue
import org.apache.ofbiz.base.util.UtilMisc
import org.apache.ofbiz.base.util.UtilValidate
import org.apache.ofbiz.manufacturing.jobshopmgt.ProductionRun
import org.apache.ofbiz.common.qrcode.QRCodeServices
import org.apache.ofbiz.service.ServiceUtil
import javax.imageio.ImageIO

delegator = request.getAttribute("delegator")

productionRunId = request.getParameter("productionRunId")
if (UtilValidate.isEmpty(productionRunId)) {
    productionRunId = request.getParameter("workEffortId")
}
if (UtilValidate.isNotEmpty(productionRunId)) {

    GenericValue productionRun = from("WorkEffort").where("workEffortId", productionRunId).queryOne();
    if (UtilValidate.isNotEmpty(productionRun)) {
        // If this is a task, get the parent production run
        if (productionRun.getString("workEffortTypeId") != null && "PROD_ORDER_TASK".equals(productionRun.getString("workEffortTypeId"))) {
            productionRun = from("WorkEffort").where("workEffortId", productionRun.getString("workEffortParentId")).queryOne();
        }
    }

    
    
    // Schumann
    // now to return the routing list if not empty
    // then to loop each of them and generate the qrcode file and 
    // then export it to the tmp folder /images/qrcode/
    
    println("Executing Qrcode File Service.................................")
    ProductionRun productionRunTasks = new ProductionRun(productionRunId, delegator, dispatcher)
    List productionRunRoutingTasks = productionRunTasks.getProductionRunRoutingTasks()
    if (productionRunRoutingTasks) {
        
        //  RoutingTasks list
        productionRunRoutingTasks.each { task ->
            println(task.workEffortId)
            // Call generateQRCodeImage function for each task.workEffortId
            def context = [
                locale: Locale.getDefault(), // Set your desired locale
                message: task.workEffortId,
                width: 200,
                height: 200,
                format: "png",
                encoding: "UTF-8",
                verifyOutput: true,
                //logoImage: "/path/to/logo.png", // Set the path to your logo image
                logoImageMaxWidth: 50,
                logoImageMaxHeight: 50
            ]
            
            def result = QRCodeServices.generateQRCodeImage(dispatcher.getDispatchContext(), context)
            if (ServiceUtil.isSuccess(result)) {
                def bufferedImage = result.bufferedImage
                // Save the BufferedImage to the specified directory
                def filePath = "C:/Web/apache-ofbiz-18.12.10/themes/common-theme/webapp/images/qrcode/"
                //def fileName = "qrcode_${task.workEffortId}.png"
                def fileName = "${task.workEffortId}.png"

                ImageIO.write(bufferedImage, "png", new File(filePath + fileName))
                println("QRCode file generated and saved: $filePath$fileName")
            } else {
                def errorMessage = ServiceUtil.getErrorMessage(result)
                println("Error generating QRCode for task.workEffortId: $task.workEffortId. Error: $errorMessage")
            }
            
        }
    }
    
    
    if (UtilValidate.isEmpty(productionRun)) {
        return "error"
    }
    if ("PRUN_CREATED".equals(productionRun.getString("currentStatusId")) ||
            "PRUN_SCHEDULED".equals(productionRun.getString("currentStatusId")) ||
            "PRUN_CANCELLED".equals(productionRun.getString("currentStatusId"))) {
        return "docs_not_printed"
    } else {
        return "docs_printed"
    }
    
}

return "error"
