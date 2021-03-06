package com.wapwag.woss.modules.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wapwag.woss.common.persistence.Page;
import com.wapwag.woss.common.service.CrudService;
import com.wapwag.woss.modules.sys.dao.AccessCtrlRecordsDao;
import com.wapwag.woss.modules.sys.dao.PumpDeviceRepairDao;
import com.wapwag.woss.modules.sys.entity.PumpDeviceRepair;

@Service
@Transactional(readOnly = true)
public class PumpDeviceRepairService  extends CrudService<PumpDeviceRepairDao, PumpDeviceRepair> {
	
	@Autowired
	private PumpDeviceRepairDao pumpDeviceRepairDao;
	
	public Page<PumpDeviceRepair> findPage(Page<PumpDeviceRepair> page, PumpDeviceRepair pumpDeviceRepair) {
		return super.findPage(page, pumpDeviceRepair);
	}
	
	public List<PumpDeviceRepair> exportAll(PumpDeviceRepair record){
		return pumpDeviceRepairDao.exportAll(record);
	}
}
