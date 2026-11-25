//#region \0%23tanstack-start-server-fn-resolver
var manifest = {
	"3e061d3fb81b6b74383c986268186292686507715e1f748c605d262f35dd0258": {
		functionName: "analyzeTemplate_createServerFn_handler",
		importer: () => import("./ai.functions-CAZ4sGU-.js")
	},
	"53b8f7e710b7386c4788c0703d263c01245cf82538c30a07c1b5348380a13c3e": {
		functionName: "generateChapter_createServerFn_handler",
		importer: () => import("./ai.functions-CAZ4sGU-.js")
	},
	"75731372b9cde209304b8ca08cd0cb177a0dc345edf026d24b65989c1476a7f6": {
		functionName: "generateFigureImage_createServerFn_handler",
		importer: () => import("./ai.functions-CAZ4sGU-.js")
	},
	"ba22a3a9d6adb5d61364ddacba06847bfea8ab9c211d50e29b284d1f20a0cc6b": {
		functionName: "generateWriteUpDescription_createServerFn_handler",
		importer: () => import("./ai.functions-CAZ4sGU-.js")
	},
	"ff37bd4a346b92aa36f1ec2ff6ed8b658f41e4d31cf5e569929a78526b554496": {
		functionName: "getAiStatus_createServerFn_handler",
		importer: () => import("./ai.functions-CAZ4sGU-.js")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
