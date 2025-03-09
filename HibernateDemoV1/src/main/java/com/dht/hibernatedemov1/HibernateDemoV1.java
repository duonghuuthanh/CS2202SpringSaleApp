/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.dht.hibernatedemov1;

import com.dht.repositories.impl.CategoryRepositoryImpl;
import com.dht.repositories.impl.ProductRepositoryImpl;
import com.dht.repositories.impl.StatsRepositoryImpl;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author admin
 */
public class HibernateDemoV1 {

    public static void main(String[] args) {
        CategoryRepositoryImpl c = new CategoryRepositoryImpl();
        c.getCates().forEach(ca -> System.out.println(ca.getName()));
        
        ProductRepositoryImpl pro = new ProductRepositoryImpl();
        
        Map<String, String> params = new HashMap<>();
//        params.put("kw", "galaxy");
//        params.put("fromPrice", "18600000");
//        params.put("categoryId", "2");
        params.put("page", "2");
        
        pro.getProducts(params).forEach(p -> System.out.printf("%d - %s - %d\n", p.getId(), p.getName(), p.getPrice()));
        
        StatsRepositoryImpl st = new StatsRepositoryImpl();
        st.statsRevenueByProduct().forEach(o -> System.out.printf("%d - %s: %d\n", o[0], o[1], o[2]));
        
        System.out.println("===");
        st.statsRevenueByTime("QUARTER", 2020).forEach(o -> System.out.printf("%d: %d\n", o[0], o[1]));
    }
}
