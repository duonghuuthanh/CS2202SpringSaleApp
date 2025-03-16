/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.dht.hibernatedemov2;

import com.dht.repositores.impl.CategoryRepositoryImpl;
import com.dht.repositores.impl.ProductRepositoryImpl;
import com.dht.repositores.impl.StatsRepositoryImpl;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author admin
 */
public class HibernateDemoV2 {

    public static void main(String[] args) {
        CategoryRepositoryImpl s = new CategoryRepositoryImpl();
        s.getCates().forEach(c -> System.out.println(c.getName()));
        
        ProductRepositoryImpl s2 = new ProductRepositoryImpl();
        
        Map<String, String> params = new HashMap<>();
        params.put("page", "2");
        
        s2.getProducts(params).forEach(p -> System.out.printf("%d - %s: %d\n", p.getId(), p.getName(), p.getPrice()));
        
        System.out.println("==");
        StatsRepositoryImpl s3 = new StatsRepositoryImpl();
        s3.statsRevenueByProduct().forEach(o -> System.out.printf("%d - %s: %d\n", o[0], o[1], o[2]));
        
        System.out.println("==");
        s3.statsRevenueByTime("QUARTER", 2020).forEach(o -> System.out.printf("%d: %d\n", o[0], o[1]));
    }
}
